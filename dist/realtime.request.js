"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _RealtimeRequest_timeout;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeRequest = void 0;
const mqttot_1 = require("@igpapi/mqttot");
const flows_1 = require("./flows");
const errors_1 = require("./errors");
const debug_1 = __importDefault(require("debug"));
const realtimeRequestDebug = (0, debug_1.default)('ig:realtime:request');
class RealtimeRequest {
    constructor(mqtt, payload, topic) {
        this.mqtt = mqtt;
        this.payload = payload;
        this.topic = topic;
        _RealtimeRequest_timeout.set(this, 30 * 1000);
    }
    setTimeout(milliseconds) {
        __classPrivateFieldSet(this, _RealtimeRequest_timeout, milliseconds, "f");
    }
    async execute(options) {
        var _a, _b;
        realtimeRequestDebug(`Requesting from ${this.topic.decode(options.topic)}`);
        const flow = this.mqtt
            .client()
            .startFlow((0, flows_1.multiTopicPublish)(options.topic, options.responseTopic)(await this.payload.prepare(options.payload)));
        const timer = __classPrivateFieldGet(this, _RealtimeRequest_timeout, "f")
            ? setTimeout(() => this.mqtt.client().stopFlow(flow.flowId, new errors_1.IgRequestTimedOutError(options.topic, options.responseTopic)), __classPrivateFieldGet(this, _RealtimeRequest_timeout, "f"))
            : null;
        const buffer = await flow;
        if (timer)
            clearTimeout(timer);
        const res = await (0, mqttot_1.tryUnzipAsync)(buffer);
        return (_b = (_a = options.transformer) === null || _a === void 0 ? void 0 : _a.call(options, res)) !== null && _b !== void 0 ? _b : res;
    }
}
exports.RealtimeRequest = RealtimeRequest;
_RealtimeRequest_timeout = new WeakMap();
//# sourceMappingURL=realtime.request.js.map