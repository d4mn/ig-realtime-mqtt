import { IgpapiRealtimeGraphqlQueryId } from './igpapi.realtime.graphql.query-id.js';
import { SubscriptionEntity } from '../subscriptions/subscription-entity.js';
import { RealtimeTopic } from '../realtime.topic.js';
export declare class IgpapiRealtimeGraphqlSubscription {
    private topic;
    clientLogged?: boolean;
    constructor(topic: RealtimeTopic);
    generate(queryId: IgpapiRealtimeGraphqlQueryId, inputParams: Record<string, string>): SubscriptionEntity;
}
//# sourceMappingURL=igpapi.realtime.graphql.subscription.d.ts.map