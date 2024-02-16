"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSyncTopicStream = void 0;
const operators_1 = require("rxjs/operators");
const debug_1 = __importDefault(require("debug"));
const direct_thread_event_enum_1 = require("../direct-thread-event.enum");
const constants_1 = require("../../constants");
const messageSyncDebug = (0, debug_1.default)('ig:realtime:core:mixin:message-sync');
const EVENT_REGEX_MAPPING = [
    [constants_1.ThreadUpdateRegex, direct_thread_event_enum_1.DirectThreadEventEnum.update],
    [constants_1.ThreadItemRegex, direct_thread_event_enum_1.DirectThreadEventEnum.message],
    [constants_1.ThreadItemHasSeenRegex, direct_thread_event_enum_1.DirectThreadEventEnum.hasSeen],
    [constants_1.ThreadAdminUserIdsRegex, direct_thread_event_enum_1.DirectThreadEventEnum.adminUserIds],
    [constants_1.ThreadApprovalRequiredRegex, direct_thread_event_enum_1.DirectThreadEventEnum.approvalRequired],
    [constants_1.ThreadShhModeRegex, direct_thread_event_enum_1.DirectThreadEventEnum.shhMode],
    [constants_1.ThreadThemeRegex, direct_thread_event_enum_1.DirectThreadEventEnum.theme],
    [constants_1.ThreadReactionRegex, direct_thread_event_enum_1.DirectThreadEventEnum.reaction],
];
function matchDirectThreadPath(path) {
    for (let [regex, eventName] of EVENT_REGEX_MAPPING) {
        const attributes = regex(path);
        if (attributes !== null) {
            return {
                attributes,
                eventName,
            };
        }
    }
}
function messageSyncTopicStream(topics) {
    return (source$) => {
        let _payload;
        return source$.pipe((0, operators_1.filter)((message) => message.topic === topics.MessageSync), (0, operators_1.mergeMap)(message => message.payload), (0, operators_1.mergeMap)(payload => {
            _payload = payload;
            return payload.data;
        }), (0, operators_1.map)(data => [data, matchDirectThreadPath(data.path), _payload]), (0, operators_1.map)(([data, metadata, payload]) => {
            if (!metadata) {
                messageSyncDebug(`Could not match message-sync path: ${data.path}`);
                return void 0;
            }
            let parsed;
            try {
                parsed = JSON.parse(data.value);
            }
            catch (e) {
                parsed = data.value;
            }
            return {
                name: metadata.eventName,
                thread_id: metadata.attributes.thread_id,
                data: Object.assign({}, parsed, metadata.attributes),
                path: data.path,
                operation: data.op,
                raw() {
                    return payload;
                },
            };
        }), (0, operators_1.filter)((data) => typeof data !== 'undefined'));
    };
}
exports.messageSyncTopicStream = messageSyncTopicStream;
//# sourceMappingURL=message-sync-topic.stream.js.map