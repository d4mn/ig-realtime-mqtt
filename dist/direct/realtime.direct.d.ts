import { DirectThreadOptions } from './direct-thread-options';
import { RealtimeMqttManager } from '../realtime.mqtt.manager';
import { RealtimeRequest } from '../realtime.request';
import { RealtimeDirectThread } from './realtime.direct-thread';
import { RealtimeTopic } from '../realtime.topic';
import { DeflatePayloadHandler } from '../payload-handler/deflate.payload-handler';
import { ForegroundState } from './foreground.state';
import { RealtimeSubject } from '../realtime.subject';
export declare class RealtimeDirect {
    private readonly subject;
    private readonly mqtt;
    private readonly topic;
    private readonly request;
    private readonly deflate;
    $: import("rxjs").Observable<import("./direct-thread.event").DirectThreadEvent<any> | import("./direct-thread.event").DirectThreadEvent<import("./payloads").ThreadActivityIndicatorPayload>>;
    seqId$: import("rxjs").Observable<number>;
    constructor(subject: RealtimeSubject, mqtt: RealtimeMqttManager, topic: RealtimeTopic, request: RealtimeRequest, deflate: DeflatePayloadHandler);
    thread(input: DirectThreadOptions | string): RealtimeDirectThread;
    thread$(thread_id: string): import("rxjs").Observable<import("./direct-thread.event").DirectThreadEvent<any> | import("./direct-thread.event").DirectThreadEvent<import("./payloads").ThreadActivityIndicatorPayload>>;
    foregroundState(state: ForegroundState): Promise<import("mqtts").MqttMessageOutgoing>;
}
//# sourceMappingURL=realtime.direct.d.ts.map