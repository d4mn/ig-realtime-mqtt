"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityIndicatorStream = void 0;
const operators_1 = require("rxjs/operators");
const constants_1 = require("../../constants");
const direct_thread_event_enum_1 = require("../direct-thread-event.enum");
const skywalker_transformer_1 = require("../../transformers/skywalker.transformer");
function activityIndicatorStream(topics) {
    return (source$) => {
        let _payload;
        return source$.pipe((0, operators_1.filter)((message) => message.topic === topics.Pubsub && message.payload.topic === skywalker_transformer_1.SkywalkerMessageTopic.ActivityIndicator), (0, operators_1.mergeMap)(message => {
            _payload = message.payload.message;
            return message.payload.message.data;
        }), (0, operators_1.map)(data => [data, _payload]), (0, operators_1.map)(([data, payload]) => {
            const match = (0, constants_1.ActivityIndicatorRegex)(data.path);
            if (!match) {
                return void 0;
            }
            return {
                name: direct_thread_event_enum_1.DirectThreadEventEnum.activityIndicator,
                data: Object.assign({ doublePublish: data.doublePublish }, JSON.parse(data.value), match),
                path: data.path,
                operation: data.op,
                thread_id: match.thread_id,
                raw() {
                    return payload;
                },
            };
        }), (0, operators_1.filter)((data) => typeof data !== 'undefined'));
    };
}
exports.activityIndicatorStream = activityIndicatorStream;
//# sourceMappingURL=activity-indicator.stream.js.map