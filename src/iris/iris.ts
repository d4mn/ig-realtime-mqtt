import { RealtimeTopic } from '../realtime.topic';
import { RealtimeRequest } from '../realtime.request';
import { debug as d } from 'debug';
import { SubscriptionManager } from '../subscriptions/subscription-manager';
import { SkywalkerSubscriptions } from '../subscriptions';
import { IrisSubscribeResponse } from './iris-subscribe.response';

const debug = d('ig:realtime:iris');

export interface IrisSubData {
  seq_id: number;
  snapshot_at_ms: number;
  snapshot_app_version?: 'badge_count_only' | 'message' | string;
}

/**
 * Strategy for getting the seq_id for the iris subscription.
 * It differs for web and android, because the current seq_id is fetched with http request.
 */
export interface IrisPayloadStrategy {
  get(): Promise<IrisSubData>;

  /**
   * It's the control method - it should check the response and return boolean
   * If returns true - everything is ok, no need to resubscribe
   * If returns false - something is not ok, the IrisManager will try to reconnect with the new value from .get() method
   * Basically it is needed to clear the seq_id cache
   */
  check?(response: IrisSubscribeResponse): boolean;
}

/**
 * The main purpose of the Iris.subscribe() is to send a point to the instagram server
 * from where events should be replayed.
 * It is useful if the connection was lost for a while
 * but you want to replay all the events fired in period you was disconnected.
 * To achieve it you need to cache seq_id - it's the sequential number indicating the point of the last handled event.
 *
 * For example - you handled event with seq_id 1.
 * Then you disconnected ror some reason for a 5 seconds and your friend wrote you 3 messages.
 * If after reconnecting you will subscribe using seq_id from DM http request - you wont get these messages.
 * Because DM http request always returns the current seq_id.
 * But if you cache seq_id 1 and send it instead of the http-fetched seq_id - instagram server will replay these 3 messages for you.
 *
 * Empirically, it was found out you can't send seq_id that is more than ≈115 points behind the current one.
 * Otherwise instagram will response with IrisQueueOverflowException
 */
export class Iris {
  #payload?: IrisPayloadStrategy;

  constructor(
    private readonly topic: RealtimeTopic,
    private readonly request: RealtimeRequest,
    private readonly subscriptionManager: SubscriptionManager,
    private readonly skywalker: SkywalkerSubscriptions,
  ) {}

  async subscribe(): Promise<IrisSubscribeResponse> {
    if (!this.#payload) {
      throw new Error('No iris payload fetching strategy set. You should call Iris.setStrategy(...) first');
    }
    const payload = await this.#payload.get();
    // Automatically subscribe to skywalker direct
    this.subscriptionManager.subscribe(this.skywalker.directSub());
    debug(`Subscribing using payload ${JSON.stringify(payload)}`);
    const res = await this.request.execute<IrisSubscribeResponse>({
      topic: this.topic.SubIris,
      responseTopic: this.topic.SubIrisResponse,
      payload,
      transformer: data => JSON.parse(data.toString()),
    });
    debug(`Subscription response ${JSON.stringify(res)}`);

    if (this.#payload.check?.(res) === false) {
      return this.subscribe();
    }
    return res;
  }

  setStrategy(strategy: IrisPayloadStrategy) {
    debug(`Set strategy ${strategy.constructor.name}`);
    this.#payload = strategy;
  }

  hasStrategy() {
    return !!this.#payload;
  }
}
