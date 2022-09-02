import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IgpapiRealtimeObservablePool } from '../../subscriptions/igpapi.realtime.observable.pool.js';
import { IgpapiRealtimeGraphqlQuery } from '../../graphql/igpapi.realtime.graphql.query.js';
import { IgpapiRealtimeGraphqlQueryId } from '../../graphql/igpapi.realtime.graphql.query-id.js';
import { RealtimeLiveReactionResponse } from './realtime.live.reaction.response.js';

export class RealtimeLiveReaction {
  constructor(
    private readonly pool: IgpapiRealtimeObservablePool,
    private readonly query: IgpapiRealtimeGraphqlQuery,
  ) {}
  create(broadcastId: string): Observable<RealtimeLiveReactionResponse.Root> {
    const subscription = this.query.liveReactions(broadcastId);
    return this.pool.create(subscription).pipe(
      filter(payload => payload.topic === IgpapiRealtimeGraphqlQueryId.liveReactions),
      map<any, RealtimeLiveReactionResponse.Root>(payload => payload.message.live_reaction_subscribe),
    );
  }
}
