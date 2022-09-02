import { randomUUID } from 'crypto';
import { IgpapiRealtimeGraphqlQueryId } from './igpapi.realtime.graphql.query-id.js';
import { SubscriptionEntity } from '../subscriptions/subscription-entity.js';
import { RealtimeTopic } from '../realtime.topic.js';

export class IgpapiRealtimeGraphqlSubscription {
  /**
   * Have no idea what does it mean
   */
  clientLogged?: boolean;
  constructor(private topic: RealtimeTopic) {}
  generate(queryId: IgpapiRealtimeGraphqlQueryId, inputParams: Record<string, string>): SubscriptionEntity {
    const topic = this.topic.RealtimeSub;
    const sub = `1/graphqlsubscriptions/${queryId}/${JSON.stringify({
      input_data: {
        client_subscription_id: randomUUID(),
        ...inputParams,
      },
      ...(this.clientLogged ? { '%options': { client_logged: this.clientLogged } } : {}),
    })}`;
    return {
      topic,
      sub,
    };
  }
}
