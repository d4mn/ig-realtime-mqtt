"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeTopic = void 0;
class RealtimeTopic {
    decode(value) {
        var _a, _b;
        return (_b = (_a = Object.entries(this).find(([, v]) => v === value)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : value;
    }
}
exports.RealtimeTopic = RealtimeTopic;
//# sourceMappingURL=realtime.topic.js.map