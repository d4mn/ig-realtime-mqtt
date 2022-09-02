import { difference, groupBy, union } from 'lodash';
import { RealtimeMqttManager } from '../realtime.mqtt.manager';
import { SubscriptionEntity } from './subscription-entity';
import { debug as d } from 'debug';
import { RealtimePayloadHandler } from '../payload-handler/realtime.payload-handler';
import { RealtimeTopic } from '../realtime.topic';

const debug = d('ig:realtime:subscription');

export type SubscriptionManagerInput = SubscriptionEntity | SubscriptionEntity[];

export class SubscriptionManager {
  #storage: Record<string, string[]> = {};

  constructor(
    private readonly mqtt: RealtimeMqttManager,
    private readonly payload: RealtimePayloadHandler,
    private readonly topic: RealtimeTopic,
  ) {}

  public subscribe(input: SubscriptionManagerInput) {
    return this.execute(input, 'sub');
  }

  public unsubscribe(input: SubscriptionManagerInput) {
    return this.execute(input, 'unsub');
  }

  /**
   * Sends signal to subscribe to all events from the #storage
   * Intended to call after reconnect to easily restore all previous subscriptions
   */
  async restore() {
    debug('restoring subscriptions');
    const entities = Object.entries(this.#storage)
      .map(([topic, subs]) => {
        return subs.map(sub => ({ topic, sub }));
      })
      .flat();
    await this.subscribe(entities);
  }

  /**
   * Either subscribes to or unsubscribes from given subtopics depending on `action` argument
   * @param input - the topics and subtopics
   * @param action - determines if you need to subscribe or unsubscribe
   */
  private execute(input: SubscriptionManagerInput, action: 'sub' | 'unsub') {
    const subs = input instanceof Array ? input : [input];
    // Need to group subscriptions by topic because we can only execute bulk subscriptions per one topic
    const groupedByTopic = groupBy(subs, x => x.topic);
    return Object.entries(groupedByTopic).map(async ([topic, entities]) => {
      //@ts-ignore
      const subs = entities.map(s => s.sub);
      this.save(topic, subs, action);
      const payload = await this.payload.prepare({ [action]: subs });
      // If client is not connected yet, just stop. The subscriptions state was saved and will be restored once mqtt ready
      if (!this.mqtt.hasClient() || !this.mqtt.client().ready) {
        return void 0;
      }
      debug(
        `Publish payload ${payload.byteLength} bytes with: Action: ${action}; Topic: ${this.topic.decode(
          topic,
        )}; SubTopics: ${JSON.stringify(subs)}`,
      );
      return this.mqtt.client().publish({
        topic,
        payload,
        qosLevel: 1,
      });
    });
  }

  /**
   * Just saves the current subscriptions state in the RAM
   */
  private save(topic: string, subs: string[], action: 'sub' | 'unsub') {
    debug(`Save action: ${action}; Topic: ${this.topic.decode(topic)}; SubTopics: ${JSON.stringify(subs)}`);
    const operation = action === 'sub' ? union : difference;
    this.#storage[topic] = operation(this.#storage[topic], subs);
  }
}
