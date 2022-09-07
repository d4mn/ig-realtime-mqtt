/// <reference types="node" />
import { RealtimeMqttManager } from "./realtime.mqtt.manager";
import { RealtimeMqttStrategy } from "./realtime.mqtt.strategy";
import { SubscriptionManager } from "./subscriptions/subscription-manager";
import { Iris } from "./iris/iris";
import { RealtimeSubject } from "./realtime.subject";
import { RealtimeTopic } from "./realtime.topic";
import { RealtimeMessage } from "./realtime.message";
import { IgpapiRealtimeGraphqlQuery } from "./graphql/index.js";
import { EventEmitter } from "stream";
export declare class IgpapiRealtime extends EventEmitter {
    #private;
    private readonly strategy;
    readonly mqtt: RealtimeMqttManager;
    private readonly subject;
    readonly subscriptions: SubscriptionManager;
    readonly graphql: IgpapiRealtimeGraphqlQuery;
    readonly iris: Iris;
    readonly topic: RealtimeTopic;
    $: import("rxjs").Observable<RealtimeMessage<any>>;
    private safeDisconnect;
    constructor(strategy: RealtimeMqttStrategy, mqtt: RealtimeMqttManager, subject: RealtimeSubject, subscriptions: SubscriptionManager, graphql: IgpapiRealtimeGraphqlQuery, iris: Iris, topic: RealtimeTopic);
    connect(): Promise<void>;
    disconnect(): Promise<any>;
    protected setupListeners(): void;
}
//# sourceMappingURL=igpapi.realtime.d.ts.map