"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IgpapiRealtimeObservablePool_storage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgpapiRealtimeObservablePool = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class IgpapiRealtimeObservablePool {
    constructor(subscriptions, subject) {
        this.subscriptions = subscriptions;
        this.subject = subject;
        _IgpapiRealtimeObservablePool_storage.set(this, new Map());
    }
    create(sub) {
        const cacheKey = `${sub.sub}.${sub.topic}`;
        let observable = __classPrivateFieldGet(this, _IgpapiRealtimeObservablePool_storage, "f").get(cacheKey);
        if (observable) {
            return observable;
        }
        observable = new rxjs_1.Observable(subscriber => {
            this.subject
                .pipe((0, operators_1.filter)(m => m.topic === sub.topic), (0, operators_1.map)(m => m.payload))
                .subscribe(subscriber);
            this.subscriptions.subscribe(sub);
            return () => {
                this.subscriptions.unsubscribe(sub);
                __classPrivateFieldGet(this, _IgpapiRealtimeObservablePool_storage, "f").delete(cacheKey);
            };
        }).pipe((0, operators_1.share)({ resetOnRefCountZero: true }));
        __classPrivateFieldGet(this, _IgpapiRealtimeObservablePool_storage, "f").set(cacheKey, observable);
        return observable;
    }
}
exports.IgpapiRealtimeObservablePool = IgpapiRealtimeObservablePool;
_IgpapiRealtimeObservablePool_storage = new WeakMap();
//# sourceMappingURL=igpapi.realtime.observable.pool.js.map