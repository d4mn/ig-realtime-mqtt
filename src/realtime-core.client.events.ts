import {
  AppPresenceEventPayload,
  ClientConfigUpdatePayload,
  LiveQuestionSubmissionStatusPayload,
  LiveVideoCommentPayload,
  RealtimeDirectPayload,
  RealtimeZeroProvisionPayload,
} from './payloads';
import { MqttMessage } from 'mqtts';
import {
  ThreadAdminUserIdsEvent,
  ThreadApprovalRequiredEvent,
  ThreadHasSeenEvent,
  ThreadMessageEvent,
  ThreadReactionEvent,
  ThreadShhModeEvent,
  ThreadThemeEvent,
  ThreadUpdateEvent,
} from './payloads/thread-event.payload';
import { ThreadActivityIndicatorPayload } from './direct/payloads/thread-activity-indicator.payload';
import { GraphQLTransformerResult } from './transformers/graphql.transformer';
import { IgpapiRealtimeGraphqlQueryId } from './graphql/igpapi.realtime.graphql.query-id.js';

export type RealtimeCoreClientEvents = {
  error: Error;
  warning: Error;
  receiveRaw: MqttMessage;
  close: [];
  disconnect: []; // TODO: reason?
  direct: RealtimeDirectPayload;
  realtimeSub: GraphQLTransformerResult<unknown>;
  activityIndicator: ThreadActivityIndicatorPayload;
  regionHint: string;
  seqId: number;
} & GraphQlPayloads &
  ThreadEvents;

export type GraphQlPayloads = {
  [x in Exclude<keyof typeof IgpapiRealtimeGraphqlQueryId, keyof KnownGraphQlPayloads>]:
    | string
    | Record<string, unknown>;
} & KnownGraphQlPayloads;
export type KnownGraphQlPayloads = {
  appPresence: AppPresenceEventPayload;
  clientConfigUpdate: ClientConfigUpdatePayload;
  zeroProvision: RealtimeZeroProvisionPayload;
  liveRealtimeComments: LiveVideoCommentPayload;
  interactivityRealtimeQuestionSubmissionsStatus: LiveQuestionSubmissionStatusPayload;
};

export type ThreadEvents = {
  threadMessage: ThreadMessageEvent;
  threadUpdate: ThreadUpdateEvent;
  threadHasSeen: ThreadHasSeenEvent;
  threadAdminUserIds: ThreadAdminUserIdsEvent;
  threadApprovalRequired: ThreadApprovalRequiredEvent;
  threadShhMode: ThreadShhModeEvent;
  threadTheme: ThreadThemeEvent; // set via /api/v1/direct_v2/threads/:threadId/set_theme/:themeId/ but what's a theme id? also a /api/v1/direct_v2/threads/get_themes/ endpoint seems to exist
  threadReaction: ThreadReactionEvent; //  isn't used anymore?! / @jan '21 still used
};
