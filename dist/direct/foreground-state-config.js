"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foregroundStateConfig = void 0;
const mqttot_1 = require("@igpapi/mqttot");
exports.foregroundStateConfig = [
    mqttot_1.thriftDescriptors.boolean('inForegroundApp', 1),
    mqttot_1.thriftDescriptors.boolean('inForegroundDevice', 2),
    mqttot_1.thriftDescriptors.int32('keepAliveTimeout', 3),
    mqttot_1.thriftDescriptors.listOfBinary('subscribeTopics', 4),
    mqttot_1.thriftDescriptors.listOfBinary('subscribeGenericTopics', 5),
    mqttot_1.thriftDescriptors.listOfBinary('unsubscribeTopics', 6),
    mqttot_1.thriftDescriptors.listOfBinary('unsubscribeGenericTopics', 7),
    mqttot_1.thriftDescriptors.int64('requestId', 8),
];
//# sourceMappingURL=foreground-state-config.js.map