"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlTransformer = void 0;
const mqttot_1 = require("@igpapi/mqttot");
function graphqlTransformer(data) {
    var _a, _b;
    const parsed = (0, mqttot_1.thriftReadToObject)(data, [
        mqttot_1.thriftDescriptors.binary('topic', 1),
        mqttot_1.thriftDescriptors.binary('message', 2),
    ]);
    return {
        topic: (_a = parsed.topic) !== null && _a !== void 0 ? _a : '',
        message: JSON.parse((_b = parsed.message) !== null && _b !== void 0 ? _b : '""'),
    };
}
exports.graphqlTransformer = graphqlTransformer;
//# sourceMappingURL=graphql.transformer.js.map