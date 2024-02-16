"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterThreadByOperation = void 0;
const operators_1 = require("rxjs/operators");
function filterThreadByOperation(operation) {
    const _operation = operation instanceof Array ? operation : [operation];
    return (source$) => {
        return source$.pipe((0, operators_1.filter)(e => _operation.includes(e.operation)));
    };
}
exports.filterThreadByOperation = filterThreadByOperation;
//# sourceMappingURL=filter-thread-by-operation.js.map