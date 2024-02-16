"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterThreadByType = void 0;
const operators_1 = require("rxjs/operators");
function filterThreadByType(event) {
    return (source$) => {
        return source$.pipe((0, operators_1.filter)(e => e.name === event));
    };
}
exports.filterThreadByType = filterThreadByType;
//# sourceMappingURL=filter-thread-by-type.js.map