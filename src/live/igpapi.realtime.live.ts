import { Observable } from 'rxjs';
import { RealtimeLiveComment, RealtimeLiveCommentResponse } from './comments/index.js';
import { RealtimeLiveReaction, RealtimeLiveReactionResponse } from './reaction/index.js';

export type IgpapiRealtimeLiveInput = {
  broadcastId: string;
};

export class IgpapiRealtimeLive {
  constructor(
    readonly input: IgpapiRealtimeLiveInput,
    private liveComments: RealtimeLiveComment,
    private liveReaction: RealtimeLiveReaction,
  ) {}
  get comments(): Observable<RealtimeLiveCommentResponse.Root> {
    return this.liveComments.create(this.input.broadcastId);
  }
  get reaction(): Observable<RealtimeLiveReactionResponse.Root> {
    return this.liveReaction.create(this.input.broadcastId);
  }
}
