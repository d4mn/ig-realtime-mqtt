import { Observable } from 'rxjs';
import { DirectItemAckResponse, TypingStatus } from '../types';
import { RealtimeTopic } from '../realtime.topic';
import { RealtimeRequest } from '../realtime.request';
import { ThreadItemType } from './thread-item-type';
import { DirectThreadOptions } from './direct-thread-options';
import { DirectThreadEvent } from './direct-thread.event';
export declare class RealtimeDirectThread {
    readonly $: Observable<DirectThreadEvent>;
    private readonly options;
    private readonly topic;
    private readonly request;
    constructor($: Observable<DirectThreadEvent>, options: DirectThreadOptions, topic: RealtimeTopic, request: RealtimeRequest);
    sendItem(options: {
        item_type: ThreadItemType;
    } & any): Promise<DirectItemAckResponse>;
    sendHashtag(options: {
        text?: string;
        hashtag: string;
    }): Promise<DirectItemAckResponse>;
    sendLike(): Promise<DirectItemAckResponse>;
    sendLocation(options: {
        text?: string;
        venue_id: string;
    }): Promise<DirectItemAckResponse>;
    sendMedia(options: {
        text?: string;
        media_id: string;
    }): Promise<DirectItemAckResponse>;
    sendProfile(options: {
        text?: string;
        profile_user_id: string;
    }): Promise<DirectItemAckResponse>;
    sendReaction(options: {
        item_id: string;
        reaction_status?: 'created' | 'deleted';
        target_item_type?: ThreadItemType | string;
        emoji?: string;
    }): Promise<DirectItemAckResponse>;
    sendUserStory(options: {
        text?: string;
        media_id: string;
    }): Promise<DirectItemAckResponse>;
    sendText(options: {
        text: string;
        skipUrlCheck?: boolean;
    }): Promise<DirectItemAckResponse>;
    sendLink(options: {
        link_text: string;
        link_urls: string[];
    }): Promise<DirectItemAckResponse>;
    markAsSeen(options: {
        item_id: string;
    }): Promise<DirectItemAckResponse>;
    markVisualItemSeen(options: {
        itemId: string;
    }): Promise<DirectItemAckResponse>;
    indicateActivity(options: {
        activity_status?: TypingStatus;
    }): Promise<DirectItemAckResponse>;
    private execute;
}
//# sourceMappingURL=realtime.direct-thread.d.ts.map