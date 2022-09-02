import { RealtimeMqttManager } from '../realtime.mqtt.manager';
import { SubscriptionEntity } from './subscription-entity';
import { RealtimePayloadHandler } from '../payload-handler/realtime.payload-handler';
import { RealtimeTopic } from '../realtime.topic';
export declare type SubscriptionManagerInput = SubscriptionEntity | SubscriptionEntity[];
export declare class SubscriptionManager {
    #private;
    private readonly mqtt;
    private readonly payload;
    private readonly topic;
    constructor(mqtt: RealtimeMqttManager, payload: RealtimePayloadHandler, topic: RealtimeTopic);
    subscribe(input: SubscriptionManagerInput): Promise<import("mqtts").MqttMessageOutgoing | undefined>[];
    unsubscribe(input: SubscriptionManagerInput): Promise<import("mqtts").MqttMessageOutgoing | undefined>[];
    restore(): Promise<void>;
    private execute;
    private save;
}
//# sourceMappingURL=subscription-manager.d.ts.map