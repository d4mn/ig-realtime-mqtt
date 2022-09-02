import { distinctUntilChanged, filter, scan } from 'rxjs/operators';
import { DirectThreadOptions } from './direct-thread-options';
import { RealtimeMqttManager } from '../realtime.mqtt.manager';
import { RealtimeRequest } from '../realtime.request';
import { RealtimeDirectThread } from './realtime.direct-thread';
import { filterThreadById } from './filters';
import { RealtimeTopic } from '../realtime.topic';
import { DeflatePayloadHandler } from '../payload-handler/deflate.payload-handler';
import { thriftWriteFromObject } from '@igpapi/mqttot';
import { foregroundStateConfig } from './foreground-state-config';
import { ForegroundState } from './foreground.state';
import debug from 'debug';
import { directObservablesFacadeMixin } from './direct-observables-facade.mixin';
import { messageSyncTopicStream } from './streams/message-sync-topic.stream';
import { merge } from 'rxjs';
import { activityIndicatorStream } from './streams/activity-indicator.stream';
import { RealtimeSubject } from '../realtime.subject';

const directDebug = debug('ig:realtime:direct');

export class RealtimeDirect {
  public $;
  public seqId$;

  constructor(
    private readonly subject: RealtimeSubject,
    private readonly mqtt: RealtimeMqttManager,
    private readonly topic: RealtimeTopic,
    private readonly request: RealtimeRequest,
    private readonly deflate: DeflatePayloadHandler,
  ) {
    /**
     * Emits all the direct events
     */
    this.$ = merge(
      this.subject.pipe(messageSyncTopicStream(this.topic)),
      this.subject.pipe(activityIndicatorStream(this.topic)),
    );
    /**
     * Provides a way to keep track of the current sequence-id (seq_id).
     * This way the client can save this id and the server will return all messages "newer" than this sequence id.
     */
    this.seqId$ = this.$.pipe(
      scan(
        (seqId, event) =>
        //@ts-ignore
          Math.max(event.raw().seq_id, seqId) || event.raw().seq_id || seqId,
        NaN,
      ),
      filter((v) => !!v),
      distinctUntilChanged(),
    );
    directObservablesFacadeMixin(this);
  }

  /**
   * @param input - either whole options object or just thread id
   * @returns thread commands class
   */
  thread(input: DirectThreadOptions | string) {
    const options: DirectThreadOptions =
      typeof input === 'string' ? { thread_id: input } : input;
    const $ = this.$.pipe(filterThreadById(options.thread_id));
    return new RealtimeDirectThread($, options, this.topic, this.request);
  }

  /**
   * Just a shortcut for filterThreadById pipe operator
   * @param thread_id - thread id
   * @returns observable with all the direct thread events
   */
  thread$(thread_id: string) {
    return this.$.pipe(filterThreadById(thread_id));
  }

  public async foregroundState(state: ForegroundState) {
    directDebug(`Updated foreground state: ${JSON.stringify(state)}`);
    return this.mqtt
      .client()
      .publish({
        topic: this.topic.ForegroundState,
        payload: await this.deflate.compress(
          Buffer.concat([
            Buffer.alloc(1, 0),
            thriftWriteFromObject(state, foregroundStateConfig),
          ]),
        ),
        qosLevel: 1,
      })
      .then((res) => {
        // updating the keepAlive to match the shared value
        if (state.keepAliveTimeout != null) {
          this.mqtt.client().keepAlive = state.keepAliveTimeout;
        }
        return res;
      });
  }
}
