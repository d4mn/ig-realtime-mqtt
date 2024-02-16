import { RealtimeTopic } from '../realtime.topic';
import { RealtimeRequest } from '../realtime.request';
import { SubscriptionManager } from '../subscriptions/subscription-manager';
import { SkywalkerSubscriptions } from '../subscriptions';
import { IrisSubscribeResponse } from './iris-subscribe.response';
export interface IrisSubData {
    seq_id: number;
    snapshot_at_ms: number;
    snapshot_app_version?: 'badge_count_only' | 'message' | string;
}
export interface IrisPayloadStrategy {
    get(): Promise<IrisSubData>;
    check?(response: IrisSubscribeResponse): boolean;
}
export declare class Iris {
    #private;
    private readonly topic;
    private readonly request;
    private readonly subscriptionManager;
    private readonly skywalker;
    constructor(topic: RealtimeTopic, request: RealtimeRequest, subscriptionManager: SubscriptionManager, skywalker: SkywalkerSubscriptions);
    subscribe(): Promise<IrisSubscribeResponse>;
    setStrategy(strategy: IrisPayloadStrategy): void;
    hasStrategy(): boolean;
}
//# sourceMappingURL=iris.d.ts.map