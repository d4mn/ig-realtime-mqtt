import { Observable } from 'rxjs';
import { IgpapiRealtimeObservablePool } from '../../subscriptions/igpapi.realtime.observable.pool.js';
import { IgpapiRealtimeGraphqlQuery } from '../../graphql/igpapi.realtime.graphql.query.js';
import { RealtimeLiveReactionResponse } from './realtime.live.reaction.response.js';
export declare class RealtimeLiveReaction {
    private readonly pool;
    private readonly query;
    constructor(pool: IgpapiRealtimeObservablePool, query: IgpapiRealtimeGraphqlQuery);
    create(broadcastId: string): Observable<RealtimeLiveReactionResponse.Root>;
}
//# sourceMappingURL=realtime.live.reaction.d.ts.map