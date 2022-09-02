import { Observable } from 'rxjs';
import { IgpapiRealtimeObservablePool } from '../../subscriptions/index.js';
import { IgpapiRealtimeGraphqlQuery } from '../../graphql/index.js';
import { RealtimeLiveCommentResponse } from './realtime.live.comment.response.js';
export declare class RealtimeLiveComment {
    private readonly pool;
    private readonly query;
    constructor(pool: IgpapiRealtimeObservablePool, query: IgpapiRealtimeGraphqlQuery);
    create(broadcastId: string): Observable<RealtimeLiveCommentResponse.Root>;
}
//# sourceMappingURL=realtime.live.comment.d.ts.map