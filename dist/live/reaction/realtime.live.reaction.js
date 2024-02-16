"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeLiveReaction = void 0;
const operators_1 = require("rxjs/operators");
const igpapi_realtime_graphql_query_id_js_1 = require("../../graphql/igpapi.realtime.graphql.query-id.js");
class RealtimeLiveReaction {
    constructor(pool, query) {
        this.pool = pool;
        this.query = query;
    }
    create(broadcastId) {
        const subscription = this.query.liveReactions(broadcastId);
        return this.pool.create(subscription).pipe((0, operators_1.filter)(payload => payload.topic === igpapi_realtime_graphql_query_id_js_1.IgpapiRealtimeGraphqlQueryId.liveReactions), (0, operators_1.map)(payload => payload.message.live_reaction_subscribe));
    }
}
exports.RealtimeLiveReaction = RealtimeLiveReaction;
//# sourceMappingURL=realtime.live.reaction.js.map