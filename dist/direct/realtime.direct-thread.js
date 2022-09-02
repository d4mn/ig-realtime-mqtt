"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeDirectThread = void 0;
const constants_1 = require("../constants");
const crypto_1 = require("crypto");
const types_1 = require("../types");
const errors_1 = require("../errors");
const thread_item_type_1 = require("./thread-item-type");
const direct_observables_facade_mixin_1 = require("./direct-observables-facade.mixin");
class RealtimeDirectThread {
    constructor($, options, topic, request) {
        this.$ = $;
        this.options = options;
        this.topic = topic;
        this.request = request;
        (0, direct_observables_facade_mixin_1.directObservablesFacadeMixin)(this);
        console.log(constants_1.URL_REGEXP);
    }
    async sendItem(options) {
        return this.execute({
            is_shh_mode: '0',
            ...options,
            action: 'send_item',
        });
    }
    async sendHashtag(options) {
        return this.sendItem({
            text: '',
            item_id: options.hashtag,
            ...options,
            item_type: thread_item_type_1.ThreadItemType.Hashtag,
        });
    }
    async sendLike() {
        return this.sendItem({
            item_type: thread_item_type_1.ThreadItemType.Like,
        });
    }
    async sendLocation(options) {
        return this.sendItem({
            text: '',
            item_id: options.venue_id,
            ...options,
            item_type: thread_item_type_1.ThreadItemType.Location,
        });
    }
    async sendMedia(options) {
        return this.sendItem({
            text: '',
            ...options,
            item_type: thread_item_type_1.ThreadItemType.MediaShare,
        });
    }
    async sendProfile(options) {
        return this.sendItem({
            item_id: options.profile_user_id,
            text: '',
            ...options,
            itemType: 'profile',
        });
    }
    async sendReaction(options) {
        return this.sendItem({
            reaction_status: 'created',
            target_item_type: thread_item_type_1.ThreadItemType.Text,
            ...options,
            action: 'send_item',
            item_type: thread_item_type_1.ThreadItemType.Reaction,
            node_type: 'item',
            reaction_type: 'like',
            reaction_action_source: 'double_tap',
        });
    }
    async sendUserStory(options) {
        return this.sendItem({
            text: '',
            item_id: options.media_id,
            ...options,
            item_type: thread_item_type_1.ThreadItemType.ReelShare,
        });
    }
    async sendText(options) {
        if (!options.skipUrlCheck) {
            const urls = options.text.match(constants_1.URL_REGEXP);
            if (urls instanceof Array) {
                return this.sendLink({ link_urls: urls, link_text: options.text });
            }
        }
        return this.sendItem({
            ...options,
            item_type: thread_item_type_1.ThreadItemType.Text,
        });
    }
    async sendLink(options) {
        return this.sendItem({
            ...options,
            item_type: thread_item_type_1.ThreadItemType.Link,
            link_urls: JSON.stringify(options.link_urls),
        });
    }
    async markAsSeen(options) {
        return this.execute({
            ...options,
            action: 'mark_seen',
        });
    }
    markVisualItemSeen(options) {
        return this.execute({
            item_ids: JSON.stringify([options.itemId]),
            action: 'mark_visual_item_seen',
            target_item_type: 'voice_media',
        });
    }
    async indicateActivity(options) {
        return this.execute({
            activity_status: types_1.TypingStatus.Text,
            ...options,
            action: 'indicate_activity',
        });
    }
    async execute(options) {
        var _a;
        const clientContext = (_a = options.client_context) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)();
        const json = JSON.stringify({
            client_context: clientContext,
            offline_threading_id: clientContext,
            ...this.options,
            ...options,
        });
        const response = await this.request.execute({
            topic: this.topic.SendMessage,
            responseTopic: this.topic.SendMessageResponse,
            payload: json,
            transformer: buffer => JSON.parse(buffer.toString()),
        });
        if (response.status !== 'ok') {
            throw new errors_1.IgCommandFailedError(response.payload, Number(response.status_code), response.status);
        }
        return response;
    }
}
exports.RealtimeDirectThread = RealtimeDirectThread;
//# sourceMappingURL=realtime.direct-thread.js.map