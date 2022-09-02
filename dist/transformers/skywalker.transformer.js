"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skywalkerTransformer = exports.SkywalkerMessageTopic = void 0;
const mqttot_1 = require("@igpapi/mqttot");
var SkywalkerMessageTopic;
(function (SkywalkerMessageTopic) {
    SkywalkerMessageTopic[SkywalkerMessageTopic["ActivityIndicator"] = 1] = "ActivityIndicator";
    SkywalkerMessageTopic[SkywalkerMessageTopic["LiveNotification"] = 2] = "LiveNotification";
    SkywalkerMessageTopic[SkywalkerMessageTopic["LiveUnknown"] = 3] = "LiveUnknown";
    SkywalkerMessageTopic[SkywalkerMessageTopic["VideoCall"] = 4] = "VideoCall";
})(SkywalkerMessageTopic = exports.SkywalkerMessageTopic || (exports.SkywalkerMessageTopic = {}));
function skywalkerTransformer(data) {
    var _a, _b;
    const parsed = (0, mqttot_1.thriftReadToObject)(data, [
        mqttot_1.thriftDescriptors.int32('topic', 1),
        mqttot_1.thriftDescriptors.binary('message', 2),
    ]);
    return {
        topic: (_a = parsed.topic) !== null && _a !== void 0 ? _a : -1,
        message: JSON.parse((_b = parsed.message) !== null && _b !== void 0 ? _b : '""'),
    };
}
exports.skywalkerTransformer = skywalkerTransformer;
//# sourceMappingURL=skywalker.transformer.js.map