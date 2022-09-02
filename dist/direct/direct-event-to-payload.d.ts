import { DirectThreadEventEnum } from './direct-thread-event.enum';
import { ThreadActivityIndicatorPayload, ThreadAdminUserIdsPayload, ThreadHasSeenPayload, ThreadMessagePayload, ThreadReactionPayload, ThreadShhModePayload, ThreadThemePayload, ThreadUpdatePayload } from './payloads';
export declare type DirectEventToPayload = {
    [DirectThreadEventEnum.activityIndicator]: ThreadActivityIndicatorPayload;
    [DirectThreadEventEnum.adminUserIds]: ThreadAdminUserIdsPayload;
    [DirectThreadEventEnum.hasSeen]: ThreadHasSeenPayload;
    [DirectThreadEventEnum.approvalRequired]: {};
    [DirectThreadEventEnum.shhMode]: ThreadShhModePayload;
    [DirectThreadEventEnum.theme]: ThreadThemePayload;
    [DirectThreadEventEnum.update]: ThreadUpdatePayload;
    [DirectThreadEventEnum.reaction]: ThreadReactionPayload;
    [DirectThreadEventEnum.message]: ThreadMessagePayload;
};
//# sourceMappingURL=direct-event-to-payload.d.ts.map