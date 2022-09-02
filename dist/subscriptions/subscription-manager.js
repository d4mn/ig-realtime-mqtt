"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SubscriptionManager_storage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionManager = void 0;
const lodash_1 = require("lodash");
const debug_1 = require("debug");
const debug = (0, debug_1.debug)('ig:realtime:subscription');
class SubscriptionManager {
    constructor(mqtt, payload, topic) {
        this.mqtt = mqtt;
        this.payload = payload;
        this.topic = topic;
        _SubscriptionManager_storage.set(this, {});
    }
    subscribe(input) {
        return this.execute(input, 'sub');
    }
    unsubscribe(input) {
        return this.execute(input, 'unsub');
    }
    async restore() {
        debug('restoring subscriptions');
        const entities = Object.entries(__classPrivateFieldGet(this, _SubscriptionManager_storage, "f"))
            .map(([topic, subs]) => {
            return subs.map(sub => ({ topic, sub }));
        })
            .flat();
        await this.subscribe(entities);
    }
    execute(input, action) {
        const subs = input instanceof Array ? input : [input];
        const groupedByTopic = (0, lodash_1.groupBy)(subs, x => x.topic);
        return Object.entries(groupedByTopic).map(async ([topic, entities]) => {
            const subs = entities.map(s => s.sub);
            this.save(topic, subs, action);
            const payload = await this.payload.prepare({ [action]: subs });
            if (!this.mqtt.hasClient() || !this.mqtt.client().ready) {
                return void 0;
            }
            debug(`Publish payload ${payload.byteLength} bytes with: Action: ${action}; Topic: ${this.topic.decode(topic)}; SubTopics: ${JSON.stringify(subs)}`);
            return this.mqtt.client().publish({
                topic,
                payload,
                qosLevel: 1,
            });
        });
    }
    save(topic, subs, action) {
        debug(`Save action: ${action}; Topic: ${this.topic.decode(topic)}; SubTopics: ${JSON.stringify(subs)}`);
        const operation = action === 'sub' ? lodash_1.union : lodash_1.difference;
        __classPrivateFieldGet(this, _SubscriptionManager_storage, "f")[topic] = operation(__classPrivateFieldGet(this, _SubscriptionManager_storage, "f")[topic], subs);
    }
}
exports.SubscriptionManager = SubscriptionManager;
_SubscriptionManager_storage = new WeakMap();
//# sourceMappingURL=subscription-manager.js.map