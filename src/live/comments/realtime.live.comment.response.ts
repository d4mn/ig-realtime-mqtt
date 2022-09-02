export namespace RealtimeLiveCommentResponse {
  export interface Root {
    client_subscription_id: string;
    live_seconds_per_comment: number;
    comment_likes_enabled: boolean;
    comment_count: number;
    caption: null;
    caption_is_edited: boolean;
    has_more_comments: boolean;
    has_more_headload_comments: boolean;
    media_header_display: string;
    comment_muted: number;
    is_viewer_comment_allowed: boolean;
    user_pay_supporters_info: string;
    comments?: Comment[];
    pinned_comment: null;
    unpinned_comment: null;
    system_comments: null;
  }

  export interface Comment {
    pk: string;
    user_id: string;
    parent_comment_id: string;
    text: string;
    type: number;
    created_at: number;
    created_at_utc: number;
    content_type: string;
    status: string;
    bit_flags: number;
    did_report_as_spam: boolean;
    inline_composer_display_condition: string;
    user: User;
  }

  export interface User {
    pk: string;
    username: string;
    full_name: string;
    is_mentionable: boolean;
    friendship_status: FriendshipStatus;
    is_private: boolean;
    profile_pic_url: string;
    profile_pic_id: null;
    is_verified: boolean;
    live_with_eligibility: string;
    live_moderator_eligibility: string;
    live_moderator_status: string;
  }

  export interface FriendshipStatus {
    blocking: boolean;
  }
}
