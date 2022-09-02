import { tryUnzipAsync } from '@igpapi/mqttot';
import { multiTopicPublish } from './flows';
import { RealtimeMqttManager } from './realtime.mqtt.manager';
import { IgRequestTimedOutError } from './errors';
import debug from 'debug';
import { RealtimePayloadHandler } from './payload-handler/realtime.payload-handler';
import { RealtimeTopic } from './realtime.topic';

const realtimeRequestDebug = debug('ig:realtime:request');

/**
 *  This method is used to easily handle the common request - response pattern in mqtt.
 *  There are two topics, one is the topic on which the request is sent
 *  and the other one is where the response is received.
 *  There is the common option to transform the response, however the response is unzipped (if valid) by default.
 *
 *  Under the hood, it uses the `multiTopicPublish` flow.
 */
export class RealtimeRequest {
  constructor(
    private readonly mqtt: RealtimeMqttManager,
    private readonly payload: RealtimePayloadHandler,
    private readonly topic: RealtimeTopic,
  ) {}
  #timeout?: number = 30 * 1000;

  setTimeout(milliseconds?: number) {
    this.#timeout = milliseconds;
  }

  /**
   * @return {Promise<T>}
   * @param options
   * @returns {T} The transformed response
   */
  public async execute<T = Buffer>(options: {
    topic: string;
    payload: object | any[] | string | Buffer;
    responseTopic: string;
    transformer?: (data: Buffer) => T;
  }): Promise<T> {
    realtimeRequestDebug(`Requesting from ${this.topic.decode(options.topic)}`);
    const flow = this.mqtt
      .client()
      .startFlow(multiTopicPublish(options.topic, options.responseTopic)(await this.payload.prepare(options.payload)));

    const timer = this.#timeout
      ? setTimeout(
          () =>
            this.mqtt.client().stopFlow(flow.flowId, new IgRequestTimedOutError(options.topic, options.responseTopic)),
          this.#timeout,
        )
      : null;
    const buffer = await flow;
    if (timer) clearTimeout(timer);

    const res = await tryUnzipAsync(buffer);
    // @ts-ignore
    return options.transformer?.(res) ?? res;
  }
}
