import { AppPresenceEventPayload, ClientConfigUpdatePayload, LiveQuestionSubmissionStatusPayload, LiveVideoCommentPayload, RealtimeDirectPayload, RealtimeZeroProvisionPayload } from './payloads';
import { MqttMessage } from 'mqtts';
import { ThreadAdminUserIdsEvent, ThreadApprovalRequiredEvent, ThreadHasSeenEvent, ThreadMessageEvent, ThreadReactionEvent, ThreadShhModeEvent, ThreadThemeEvent, ThreadUpdateEvent } from './payloads/thread-event.payload';
import { ThreadActivityIndicatorPayload } from './direct/payloads/thread-activity-indicator.payload';
import { GraphQLTransformerResult } from './transformers/graphql.transformer';
import { IgpapiRealtimeGraphqlQueryId } from './graphql/igpapi.realtime.graphql.query-id.js';
export declare type RealtimeCoreClientEvents = {
    error: Error;
    warning: Error;
    receiveRaw: MqttMessage;
    close: [];
    disconnect: [];
    direct: RealtimeDirectPayload;
    realtimeSub: GraphQLTransformerResult<unknown>;
    activityIndicator: ThreadActivityIndicatorPayload;
    regionHint: string;
    seqId: number;
} & GraphQlPayloads & ThreadEvents;
export declare type GraphQlPayloads = {
    [x in Exclude<keyof typeof IgpapiRealtimeGraphqlQueryId, keyof KnownGraphQlPayloads>]: string | Record<string, unknown>;
} & KnownGraphQlPayloads;
export declare type KnownGraphQlPayloads = {
    appPresence: AppPresenceEventPayload;
    clientConfigUpdate: ClientConfigUpdatePayload;
    zeroProvision: RealtimeZeroProvisionPayload;
    liveRealtimeComments: LiveVideoCommentPayload;
    interactivityRealtimeQuestionSubmissionsStatus: LiveQuestionSubmissionStatusPayload;
};
export declare type ThreadEvents = {
    threadMessage: ThreadMessageEvent;
    threadUpdate: ThreadUpdateEvent;
    threadHasSeen: ThreadHasSeenEvent;
    threadAdminUserIds: ThreadAdminUserIdsEvent;
    threadApprovalRequired: ThreadApprovalRequiredEvent;
    threadShhMode: ThreadShhModeEvent;
    threadTheme: ThreadThemeEvent;
    threadReaction: ThreadReactionEvent;
};
//# sourceMappingURL=realtime-core.client.events.d.ts.map