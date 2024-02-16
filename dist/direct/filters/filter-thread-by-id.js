"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterThreadById = void 0;
const operators_1 = require("rxjs/operators");
function filterThreadById(id) {
    const _id = id instanceof Array ? id : [id];
    return (source$) => {
        return source$.pipe((0, operators_1.filter)(e => _id.includes(e.thread_id)));
    };
}
exports.filterThreadById = filterThreadById;
//# sourceMappingURL=filter-thread-by-id.js.map