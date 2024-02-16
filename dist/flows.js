"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiTopicPublish = void 0;
const mqtts_1 = require("mqtts");
function multiTopicPublish(requestTopic, responseTopic) {
    return (payload) => {
        const id = (0, mqtts_1.generateIdentifier)();
        return success => ({
            start: () => ({
                type: mqtts_1.PacketType.Publish,
                options: {
                    topic: requestTopic,
                    payload: payload,
                    qos: 1,
                    retain: false,
                    duplicate: false,
                    identifier: id,
                },
            }),
            accept: packet => ((0, mqtts_1.isPublish)(packet) && packet.topic === responseTopic) || ((0, mqtts_1.isPubAck)(packet) && packet.identifier === id),
            next: packet => {
                if ((0, mqtts_1.isPubAck)(packet))
                    return undefined;
                else if ((0, mqtts_1.isPublish)(packet))
                    success(packet.payload);
            },
        });
    };
}
exports.multiTopicPublish = multiTopicPublish;
//# sourceMappingURL=flows.js.map