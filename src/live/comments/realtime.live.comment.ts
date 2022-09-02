import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IgpapiRealtimeObservablePool } from '../../subscriptions/index.js';
import { IgpapiRealtimeGraphqlQuery, IgpapiRealtimeGraphqlQueryId } from '../../graphql/index.js';
import { RealtimeLiveCommentResponse } from './realtime.live.comment.response.js';


export class RealtimeLiveComment {
  constructor(
    private readonly pool: IgpapiRealtimeObservablePool,
    private readonly query: IgpapiRealtimeGraphqlQuery,
  ) {}
  create(broadcastId: string): Observable<RealtimeLiveCommentResponse.Root> {
    const subscription = this.query.liveRealtimeComments(broadcastId);
    return this.pool.create(subscription).pipe(
      filter(payload => payload.topic === IgpapiRealtimeGraphqlQueryId.liveRealtimeComments),
      map<any, RealtimeLiveCommentResponse.Root>(payload => payload.message.ig_live_video_comment_create_subscribe),
    );
  }
}
