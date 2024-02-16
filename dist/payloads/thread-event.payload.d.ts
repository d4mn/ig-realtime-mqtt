import { IrisPayload } from './iris.payload';
import { ThreadUpdatePayload } from '../direct/payloads/thread-update.payload';
import { ThreadMessagePayload } from '../direct/payloads/thread-message.payload';
export declare type ThreadHasSeenEvent = ThreadEventPayload<{
    userId: string;
    item_id: string;
    shh_seen_state: Record<string, unknown>;
}>;
export declare type ThreadAdminUserIdsEvent = ThreadEventPayload<{
    userId: string;
    value: boolean;
}>;
export declare type ThreadApprovalRequiredEvent = ThreadEventPayload<{}>;
export declare type ThreadShhModeEvent = ThreadEventPayload<{
    value: boolean;
}>;
export declare type ThreadThemeEvent = ThreadEventPayload<{
    id: string;
}>;
export declare type ThreadUpdateEvent = ThreadEventPayload<ThreadUpdatePayload>;
export declare type ThreadMessageEvent = ThreadEventPayload<ThreadMessagePayload>;
export declare type ThreadReactionEvent = ThreadEventPayload<{
    itemId: string;
    userId: string;
}>;
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
//# sourceMappingURL=thread-event.payload.d.ts.map