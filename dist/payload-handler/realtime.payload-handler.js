"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimePayloadHandler = void 0;
class RealtimePayloadHandler {
    async prepare(payload) {
        const buf = payload instanceof Buffer
            ? payload
            : typeof payload === 'string'
                ? Buffer.from(payload)
                : Buffer.from(JSON.stringify(payload));
        return this.compress(buf);
    }
    async compress(data) {
        return data;
    }
}
exports.RealtimePayloadHandler = RealtimePayloadHandler;
//# sourceMappingURL=realtime.payload-handler.js.map