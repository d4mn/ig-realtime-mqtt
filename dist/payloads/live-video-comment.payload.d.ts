export interface LiveVideoCommentPayload {
    live_video_comment_event: LiveVideoCommentEvent;
}
export interface LiveVideoCommentEvent {
    client_subscription_id: string;
    live_seconds_per_comment: number;
    comment_likes_enabled: boolean;
    comment_count: number;
    caption: null | string;
    caption_is_edited: boolean;
    has_more_comments: boolean;
    has_more_headload_comments: boolean;
    media_header_display: string;
    comment_muted: number;
    comments: null | LiveVideoComment[];
    pinned_comment: null | LiveVideoComment;
    system_comments: null | LiveVideoSystemComment[];
}
export interface LiveVideoSystemComment {
    pk: string;
    created_at: number;
    text: string;
    user_count: number;
    user: LiveVideoCommentUser;
}
export interface LiveVideoComment {
    pk: string;
    user_id: string;
    text: string;
    type: number;
    created_at: number;
    created_at_utc: number;
    content_type: string;
    status: 'Active' | string;
    bit_flags: number;
    did_report_as_spam: boolean;
    inline_composer_display_condition: string;
    user: LiveVideoCommentUser;
}
export interface LiveVideoCommentUser {
    pk: string;
    username: string;
    full_name: string;
    is_private: boolean;
    profile_pic_url: string;
    profile_pic_id: null;
    is_verified: boolean;
}
//# sourceMappingURL=live-video-comment.payload.d.ts.map