import { createTypedRegex } from './utilities';

export const ActivityIndicatorRegex = createTypedRegex<'thread_id' | 'activity_indicator_id'>(
  /\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/activity_indicator_id\/(?<activity_indicator_id>[\w_]+)/,
);

export const ThreadUpdateRegex = createTypedRegex<'thread_id'>(/^\/direct_v2\/inbox\/threads\/(?<thread_id>[\w_]+)$/);

export const ThreadItemRegex = createTypedRegex<'thread_id' | 'item_id'>(
  /^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/items\/(?<item_id>[\w_]+)$/,
);

export const ThreadItemHasSeenRegex = createTypedRegex<'thread_id' | 'user_id'>(
  /^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/participants\/(?<user_id>[\w_]+)\/has_seen$/,
);

export const ThreadAdminUserIdsRegex = createTypedRegex<'thread_id' | 'user_id'>(
  /^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/admin_user_ids\/(?<user_id>[\w_]+)$/,
);

export const ThreadApprovalRequiredRegex = createTypedRegex<'thread_id'>(
  /^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/approval_required_for_new_members$/,
);

export const ThreadShhModeRegex = createTypedRegex<'thread_id'>(
  /^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/shh_mode_enabled$/,
);

export const ThreadThemeRegex = createTypedRegex<'thread_id'>(/^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/theme$/);

export const ThreadReactionRegex = createTypedRegex<'thread_id' | 'item_id' | 'user_id'>(
  /^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/items\/(?<item_id>[\w_]+)\/reactions\/likes\/(?<user_id>[\w_]+)$/,
);

export const URL_REGEXP = /(?:(?:(?:[a-z]+:)?\/\/)?|www\.)(?:\S+(?::\S*)?@)?(?:localhost|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:((?:[a-z\u00a1-\uffff]{2,}))))\.?)(?::\d{2,5})?(?:[/?#][^\s"]*)?/gi

// TODO: policy violation but that seems even more useless than /theme/
// TODO: some /user paths ?!
