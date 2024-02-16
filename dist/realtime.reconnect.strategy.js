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
var _ReconnectStrategy_attempts;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReconnectStrategy = void 0;
const mqtts_1 = require("mqtts");
class ReconnectStrategy {
    constructor(state, maximum = 60, interval = 1000) {
        this.state = state;
        this.maximum = maximum;
        this.interval = interval;
        _ReconnectStrategy_attempts.set(this, 1);
    }
    check(reason) {
        console.log("ReconnectStrategy.check", reason.message, reason instanceof mqtts_1.ConnectError, "user", this.state.user, "attempt #" + __classPrivateFieldGet(this, _ReconnectStrategy_attempts, "f"));
        if (reason instanceof mqtts_1.ConnectError) {
            console.log("Return status for check: ", ["IdentifierRejected", "ServerUnavailable", "NotAuthorized"].includes(reason.status));
            return ["IdentifierRejected", "ServerUnavailable", "NotAuthorized"].includes(reason.status);
        }
        if (typeof reason === "string" && ["Soft disconnect", "Forced disconnect"].includes(reason)) {
            return false;
        }
        console.log("Unknown instance");
        return __classPrivateFieldGet(this, _ReconnectStrategy_attempts, "f") <= this.maximum;
    }
    reset() {
        __classPrivateFieldSet(this, _ReconnectStrategy_attempts, 1, "f");
    }
    wait() {
        var _a;
        __classPrivateFieldSet(this, _ReconnectStrategy_attempts, (_a = __classPrivateFieldGet(this, _ReconnectStrategy_attempts, "f"), _a++, _a), "f");
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, this.interval);
        });
    }
}
exports.ReconnectStrategy = ReconnectStrategy;
_ReconnectStrategy_attempts = new WeakMap();
//# sourceMappingURL=realtime.reconnect.strategy.js.map