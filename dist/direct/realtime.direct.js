"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeDirect = void 0;
const operators_1 = require("rxjs/operators");
const realtime_direct_thread_1 = require("./realtime.direct-thread");
const filters_1 = require("./filters");
const mqttot_1 = require("@igpapi/mqttot");
const foreground_state_config_1 = require("./foreground-state-config");
const debug_1 = __importDefault(require("debug"));
const direct_observables_facade_mixin_1 = require("./direct-observables-facade.mixin");
const message_sync_topic_stream_1 = require("./streams/message-sync-topic.stream");
const rxjs_1 = require("rxjs");
const activity_indicator_stream_1 = require("./streams/activity-indicator.stream");
const directDebug = (0, debug_1.default)('ig:realtime:direct');
class RealtimeDirect {
    constructor(subject, mqtt, topic, request, deflate) {
        this.subject = subject;
        this.mqtt = mqtt;
        this.topic = topic;
        this.request = request;
        this.deflate = deflate;
        this.$ = (0, rxjs_1.merge)(this.subject.pipe((0, message_sync_topic_stream_1.messageSyncTopicStream)(this.topic)), this.subject.pipe((0, activity_indicator_stream_1.activityIndicatorStream)(this.topic)));
        this.seqId$ = this.$.pipe((0, operators_1.scan)((seqId, event) => Math.max(event.raw().seq_id, seqId) || event.raw().seq_id || seqId, NaN), (0, operators_1.filter)((v) => !!v), (0, operators_1.distinctUntilChanged)());
        (0, direct_observables_facade_mixin_1.directObservablesFacadeMixin)(this);
    }
    thread(input) {
        const options = typeof input === 'string' ? { thread_id: input } : input;
        const $ = this.$.pipe((0, filters_1.filterThreadById)(options.thread_id));
        return new realtime_direct_thread_1.RealtimeDirectThread($, options, this.topic, this.request);
    }
    thread$(thread_id) {
        return this.$.pipe((0, filters_1.filterThreadById)(thread_id));
    }
    async foregroundState(state) {
        directDebug(`Updated foreground state: ${JSON.stringify(state)}`);
        return this.mqtt
            .client()
            .publish({
            topic: this.topic.ForegroundState,
            payload: await this.deflate.compress(Buffer.concat([
                Buffer.alloc(1, 0),
                (0, mqttot_1.thriftWriteFromObject)(state, foreground_state_config_1.foregroundStateConfig),
            ])),
            qosLevel: 1,
        })
            .then((res) => {
            if (state.keepAliveTimeout != null) {
                this.mqtt.client().keepAlive = state.keepAliveTimeout;
            }
            return res;
        });
    }
}
exports.RealtimeDirect = RealtimeDirect;
//# sourceMappingURL=realtime.direct.js.map