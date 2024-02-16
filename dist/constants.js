"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL_REGEXP = exports.ThreadReactionRegex = exports.ThreadThemeRegex = exports.ThreadShhModeRegex = exports.ThreadApprovalRequiredRegex = exports.ThreadAdminUserIdsRegex = exports.ThreadItemHasSeenRegex = exports.ThreadItemRegex = exports.ThreadUpdateRegex = exports.ActivityIndicatorRegex = void 0;
const utilities_1 = require("./utilities");
exports.ActivityIndicatorRegex = (0, utilities_1.createTypedRegex)(/\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/activity_indicator_id\/(?<activity_indicator_id>[\w_]+)/);
exports.ThreadUpdateRegex = (0, utilities_1.createTypedRegex)(/^\/direct_v2\/inbox\/threads\/(?<thread_id>[\w_]+)$/);
exports.ThreadItemRegex = (0, utilities_1.createTypedRegex)(/^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/items\/(?<item_id>[\w_]+)$/);
exports.ThreadItemHasSeenRegex = (0, utilities_1.createTypedRegex)(/^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/participants\/(?<user_id>[\w_]+)\/has_seen$/);
exports.ThreadAdminUserIdsRegex = (0, utilities_1.createTypedRegex)(/^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/admin_user_ids\/(?<user_id>[\w_]+)$/);
exports.ThreadApprovalRequiredRegex = (0, utilities_1.createTypedRegex)(/^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/approval_required_for_new_members$/);
exports.ThreadShhModeRegex = (0, utilities_1.createTypedRegex)(/^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/shh_mode_enabled$/);
exports.ThreadThemeRegex = (0, utilities_1.createTypedRegex)(/^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/theme$/);
exports.ThreadReactionRegex = (0, utilities_1.createTypedRegex)(/^\/direct_v2\/threads\/(?<thread_id>[\w_]+)\/items\/(?<item_id>[\w_]+)\/reactions\/likes\/(?<user_id>[\w_]+)$/);
exports.URL_REGEXP = /(?:(?:(?:[a-z]+:)?\/\/)?|www\.)(?:\S+(?::\S*)?@)?(?:localhost|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:((?:[a-z\u00a1-\uffff]{2,}))))\.?)(?::\d{2,5})?(?:[/?#][^\s"]*)?/gi;
//# sourceMappingURL=constants.js.map