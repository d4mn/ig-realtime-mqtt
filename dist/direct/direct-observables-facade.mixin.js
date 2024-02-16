"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directObservablesFacadeMixin = void 0;
const lodash_1 = require("lodash");
const realtime_operation_type_enum_1 = require("../realtime-operation.type.enum");
const direct_thread_event_enum_1 = require("./direct-thread-event.enum");
const filter_thread_by_operation_1 = require("./filters/filter-thread-by-operation");
const filter_thread_by_type_1 = require("./filters/filter-thread-by-type");
class DirectEventsOperationsFacade {
    constructor($) {
        this.$ = $;
        (0, lodash_1.forIn)(realtime_operation_type_enum_1.RealtimeOperationTypeEnum, (value, key) => {
            Object.assign(this, { [`${key}$`]: $.pipe((0, filter_thread_by_operation_1.filterThreadByOperation)(value)) });
        });
    }
}
function directObservablesFacadeMixin(obj) {
    (0, lodash_1.forIn)(direct_thread_event_enum_1.DirectThreadEventEnum, (value, key) => {
        const operations = new DirectEventsOperationsFacade(obj.$.pipe((0, filter_thread_by_type_1.filterThreadByType)(value)));
        Object.assign(obj, {
            [key]: operations,
        });
    });
}
exports.directObservablesFacadeMixin = directObservablesFacadeMixin;
//# sourceMappingURL=direct-observables-facade.mixin.js.map