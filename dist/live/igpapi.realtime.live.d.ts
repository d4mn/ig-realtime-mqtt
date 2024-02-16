import { Observable } from 'rxjs';
import { RealtimeLiveComment, RealtimeLiveCommentResponse } from './comments/index.js';
import { RealtimeLiveReaction, RealtimeLiveReactionResponse } from './reaction/index.js';
export declare type IgpapiRealtimeLiveInput = {
    broadcastId: string;
};
export declare class IgpapiRealtimeLive {
    readonly input: IgpapiRealtimeLiveInput;
    private liveComments;
    private liveReaction;
    constructor(input: IgpapiRealtimeLiveInput, liveComments: RealtimeLiveComment, liveReaction: RealtimeLiveReaction);
    get comments(): Observable<RealtimeLiveCommentResponse.Root>;
    get reaction(): Observable<RealtimeLiveReactionResponse.Root>;
}
//# sourceMappingURL=igpapi.realtime.live.d.ts.map