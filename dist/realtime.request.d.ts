/// <reference types="node" />
import { RealtimeMqttManager } from './realtime.mqtt.manager';
import { RealtimePayloadHandler } from './payload-handler/realtime.payload-handler';
import { RealtimeTopic } from './realtime.topic';
export declare class RealtimeRequest {
    #private;
    private readonly mqtt;
    private readonly payload;
    private readonly topic;
    constructor(mqtt: RealtimeMqttManager, payload: RealtimePayloadHandler, topic: RealtimeTopic);
    setTimeout(milliseconds?: number): void;
    execute<T = Buffer>(options: {
        topic: string;
        payload: object | any[] | string | Buffer;
        responseTopic: string;
        transformer?: (data: Buffer) => T;
    }): Promise<T>;
}
//# sourceMappingURL=realtime.request.d.ts.map