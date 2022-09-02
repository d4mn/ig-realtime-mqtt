"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeflatePayloadHandler = void 0;
const realtime_payload_handler_1 = require("./realtime.payload-handler");
const zlib_1 = require("zlib");
class DeflatePayloadHandler extends realtime_payload_handler_1.RealtimePayloadHandler {
    async compress(data) {
        return new Promise((resolve, reject) => (0, zlib_1.deflate)(data, { level: 9 }, (error, result) => (error ? reject(error) : resolve(result))));
    }
}
exports.DeflatePayloadHandler = DeflatePayloadHandler;
//# sourceMappingURL=deflate.payload-handler.js.map