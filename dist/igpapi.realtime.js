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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _IgpapiRealtime_subscription;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgpapiRealtime = void 0;
const debug_1 = __importDefault(require("debug"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const mqttot_1 = require("@igpapi/mqttot");
const graphql_transformer_1 = require("./transformers/graphql.transformer");
const skywalker_transformer_1 = require("./transformers/skywalker.transformer");
const stream_1 = require("stream");
const log = (0, debug_1.default)("ig:realtime:core");
class IgpapiRealtime extends stream_1.EventEmitter {
    constructor(strategy, mqtt, subject, subscriptions, graphql, iris, topic, direct) {
        super();
        this.strategy = strategy;
        this.mqtt = mqtt;
        this.subject = subject;
        this.subscriptions = subscriptions;
        this.graphql = graphql;
        this.iris = iris;
        this.topic = topic;
        this.direct = direct;
        this.safeDisconnect = false;
        _IgpapiRealtime_subscription.set(this, void 0);
        this.$ = this.subject.asObservable();
    }
    async connect() {
        var _a;
        log("Connecting...");
        const client = this.mqtt.hasClient() ? this.mqtt.client() : this.mqtt.create();
        (_a = __classPrivateFieldGet(this, _IgpapiRealtime_subscription, "f")) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        __classPrivateFieldSet(this, _IgpapiRealtime_subscription, (0, rxjs_1.fromEvent)(client, "message")
            .pipe((0, operators_1.mergeMap)(async (message) => {
            message.payload = await (0, mqttot_1.tryUnzipAsync)(message.payload);
            if (message.topic === this.topic.RealtimeSub) {
                message.payload = (0, graphql_transformer_1.graphqlTransformer)(message.payload);
            }
            else if (message.topic === this.topic.Pubsub) {
                message.payload = (0, skywalker_transformer_1.skywalkerTransformer)(message.payload);
            }
            else if (message.topic === this.topic.RegionHint) {
                message.payload = (0, graphql_transformer_1.graphqlTransformer)(message.payload).topic;
            }
            else {
                try {
                    message.payload = JSON.parse(message.payload.toString());
                }
                catch (e) {
                    log(`Cant parse message payload ${JSON.stringify(message)}`);
                }
            }
            return message;
        }))
            .subscribe(this.subject), "f");
        this.setupListeners();
        await Promise.all([
            new Promise((res, rej) => client.on("connect", async (packet) => {
                this.emit("connect", packet);
                log("Connected.");
                try {
                    await this.subscriptions.restore();
                    await this.strategy.setup(client);
                    if (this.iris.hasStrategy()) {
                        await this.iris.subscribe();
                    }
                    res();
                }
                catch (e) {
                    rej(e);
                }
            })),
            this.strategy.connect(client),
        ]);
    }
    disconnect() {
        this.safeDisconnect = true;
        return this.mqtt.client().disconnect();
    }
    setupListeners() {
        log(`Setting up listeners`);
        const messageDebug = log.extend("message");
        this.mqtt.client().on("message", (m) => {
            messageDebug(`topic: ${this.topic.decode(m.topic)} QoS: ${m.qosLevel} length: ${m.payload.byteLength} bytes`);
        });
        this.mqtt.client().on("error", (e) => {
            log(`MQTTS-Error:`, e);
        });
        this.mqtt.client().on("warning", (e) => {
            log(`MQTTS-Warning:`, e);
        });
        this.mqtt.client().on("disconnect", (e) => {
            this.emit("disconnect", e);
            if (!this.safeDisconnect) {
                log("Client disconnected.");
            }
            else {
                log("Session ended.");
                this.safeDisconnect = false;
            }
        });
    }
}
exports.IgpapiRealtime = IgpapiRealtime;
_IgpapiRealtime_subscription = new WeakMap();
//# sourceMappingURL=igpapi.realtime.js.map