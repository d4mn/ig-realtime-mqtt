"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeMqttManager = void 0;
class RealtimeMqttManager {
    constructor(builder) {
        this.builder = builder;
    }
    create() {
        this._client = this.builder.build();
        return this._client;
    }
    client() {
        if (!this._client) {
            throw new Error('No mqtt client created. You probably should connect first');
        }
        return this._client;
    }
    hasClient() {
        return !!this._client;
    }
}
exports.RealtimeMqttManager = RealtimeMqttManager;
//# sourceMappingURL=realtime.mqtt.manager.js.map