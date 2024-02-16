"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkywalkerSubscriptions = void 0;
class SkywalkerSubscriptions {
    constructor(topic, state) {
        this.topic = topic;
        this.state = state;
    }
    directSub(userId = this.state.extractUserId()) {
        return {
            topic: this.topic.Pubsub,
            sub: `ig/u/v1/${userId}`,
        };
    }
    liveSub(userId = this.state.extractUserId()) {
        return {
            topic: this.topic.Pubsub,
            sub: `ig/live_notification_subscribe/${userId}`,
        };
    }
}
exports.SkywalkerSubscriptions = SkywalkerSubscriptions;
//# sourceMappingURL=skywalker.subscription.js.map