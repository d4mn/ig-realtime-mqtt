"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeLiveComment = void 0;
const operators_1 = require("rxjs/operators");
const index_js_1 = require("../../graphql/index.js");
class RealtimeLiveComment {
    constructor(pool, query) {
        this.pool = pool;
        this.query = query;
    }
    create(broadcastId) {
        const subscription = this.query.liveRealtimeComments(broadcastId);
        return this.pool.create(subscription).pipe((0, operators_1.filter)(payload => payload.topic === index_js_1.IgpapiRealtimeGraphqlQueryId.liveRealtimeComments), (0, operators_1.map)(payload => payload.message.ig_live_video_comment_create_subscribe));
    }
}
exports.RealtimeLiveComment = RealtimeLiveComment;
//# sourceMappingURL=realtime.live.comment.js.map