/// <reference types="node" />
import { RealtimeMqttManager } from "./realtime.mqtt.manager";
import { RealtimeMqttStrategy } from "./realtime.mqtt.strategy";
import { SubscriptionManager } from "./subscriptions/subscription-manager";
import { RealtimeSubject } from "./realtime.subject";
import { RealtimeTopic } from "./realtime.topic";
import { RealtimeMessage } from "./realtime.message";
import { EventEmitter } from "stream";
import { RealtimeDirect } from "./direct";
import { Iris } from "./iris";
export declare class IgpapiRealtime extends EventEmitter {
    #private;
    private readonly strategy;
    readonly mqtt: RealtimeMqttManager;
    private readonly subject;
    readonly subscriptions: SubscriptionManager;
    readonly topic: RealtimeTopic;
    readonly direct?: RealtimeDirect | undefined;
    readonly iris?: Iris | undefined;
    $: import("rxjs").Observable<RealtimeMessage<any>>;
    private safeDisconnect;
    constructor(strategy: RealtimeMqttStrategy, mqtt: RealtimeMqttManager, subject: RealtimeSubject, subscriptions: SubscriptionManager, topic: RealtimeTopic, direct?: RealtimeDirect | undefined, iris?: Iris | undefined);
    connect(): Promise<void>;
    disconnect(): Promise<any>;
    protected setupListeners(): void;
}
//# sourceMappingURL=igpapi.realtime.d.ts.map