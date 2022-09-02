"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Iris_payload;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iris = void 0;
const debug_1 = require("debug");
const debug = (0, debug_1.debug)('ig:realtime:iris');
class Iris {
    constructor(topic, request, subscriptionManager, skywalker) {
        this.topic = topic;
        this.request = request;
        this.subscriptionManager = subscriptionManager;
        this.skywalker = skywalker;
        _Iris_payload.set(this, void 0);
    }
    async subscribe() {
        var _a, _b;
        if (!__classPrivateFieldGet(this, _Iris_payload, "f")) {
            throw new Error('No iris payload fetching strategy set. You should call Iris.setStrategy(...) first');
        }
        const payload = await __classPrivateFieldGet(this, _Iris_payload, "f").get();
        this.subscriptionManager.subscribe(this.skywalker.directSub());
        debug(`Subscribing using payload ${JSON.stringify(payload)}`);
        const res = await this.request.execute({
            topic: this.topic.SubIris,
            responseTopic: this.topic.SubIrisResponse,
            payload,
            transformer: data => JSON.parse(data.toString()),
        });
        debug(`Subscription response ${JSON.stringify(res)}`);
        if (((_b = (_a = __classPrivateFieldGet(this, _Iris_payload, "f")).check) === null || _b === void 0 ? void 0 : _b.call(_a, res)) === false) {
            return this.subscribe();
        }
        return res;
    }
    setStrategy(strategy) {
        debug(`Set strategy ${strategy.constructor.name}`);
        __classPrivateFieldSet(this, _Iris_payload, strategy, "f");
    }
    hasStrategy() {
        return !!__classPrivateFieldGet(this, _Iris_payload, "f");
    }
}
exports.Iris = Iris;
_Iris_payload = new WeakMap();
//# sourceMappingURL=iris.js.map