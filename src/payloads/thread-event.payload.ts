import { IrisPayload } from './iris.payload';
import { ThreadUpdatePayload } from '../direct/payloads/thread-update.payload';
import { ThreadMessagePayload } from '../direct/payloads/thread-message.payload';

export type ThreadHasSeenEvent = ThreadEventPayload<{
  userId: string;
  item_id: string;
  shh_seen_state: Record<string, unknown>;
}>;
export type ThreadAdminUserIdsEvent = ThreadEventPayload<{ userId: string; value: boolean }>;
export type ThreadApprovalRequiredEvent = ThreadEventPayload<{}>;
export type ThreadShhModeEvent = ThreadEventPayload<{ value: boolean }>;
export type ThreadThemeEvent = ThreadEventPayload<{ id: string }>;
export type ThreadUpdateEvent = ThreadEventPayload<ThreadUpdatePayload>;
export type ThreadMessageEvent = ThreadEventPayload<ThreadMessagePayload>;
export type ThreadReactionEvent = ThreadEventPayload<{ itemId: string; userId: string }>; // isn't used anymore?! / @jan '21 still used

export interface ThreadEventPayload<T> extends Partial<IrisPayload> {
  threadEvent: ThreadEvent & T;
}

export interface ThreadEvent {
  op: 'add' | 'replace' | 'remove' | string;
  path: string;
  threadId: string;
  timestamp: number;
  created_at?: number;
}
