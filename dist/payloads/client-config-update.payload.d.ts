import { IgpapiRealtimeGraphqlQueryId } from '../graphql/index.js';
export interface ClientConfigUpdatePayload {
    client_config_update_event: ClientConfigUpdateEvent;
}
export interface ClientConfigUpdateEvent {
    publish_id: string;
    client_config_name: string;
    backing: 'QE' | string;
    client_subscription_id: IgpapiRealtimeGraphqlQueryId.clientConfigUpdate;
}
//# sourceMappingURL=client-config-update.payload.d.ts.map