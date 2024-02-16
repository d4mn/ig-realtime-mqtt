"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgRequestTimedOutError = exports.IgCommandFailedError = void 0;
const ts_custom_error_1 = require("ts-custom-error");
class IgCommandFailedError extends ts_custom_error_1.CustomError {
    constructor(payload, statusCode, status) {
        super(`${statusCode} - ${payload.message || payload.client_facing_error_message}`);
        this.payload = payload;
        this.statusCode = statusCode;
        this.status = status;
    }
}
exports.IgCommandFailedError = IgCommandFailedError;
class IgRequestTimedOutError extends ts_custom_error_1.CustomError {
    constructor(requestingTopic, receivingTopic) {
        super(`After requesting on ${requestingTopic} and waiting, a response on ${receivingTopic} could not be received.`);
        this.requestingTopic = requestingTopic;
        this.receivingTopic = receivingTopic;
    }
}
exports.IgRequestTimedOutError = IgRequestTimedOutError;
//# sourceMappingURL=errors.js.map