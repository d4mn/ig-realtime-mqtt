import { AndroidState } from '../state';
import { SubscriptionEntity } from './subscription-entity';
import { RealtimeTopic } from '../realtime.topic';
export declare class SkywalkerSubscriptions {
    private topic;
    private state;
    constructor(topic: RealtimeTopic, state: AndroidState);
    directSub(userId?: string | number | bigint): SubscriptionEntity;
    liveSub(userId?: string | number | bigint): SubscriptionEntity;
}
//# sourceMappingURL=skywalker.subscription.d.ts.map