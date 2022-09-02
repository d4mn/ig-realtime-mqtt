"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypedRegex = void 0;
function createTypedRegex(regex) {
    return input => { var _a, _b; return ((_b = (_a = regex.exec(input)) === null || _a === void 0 ? void 0 : _a.groups) !== null && _b !== void 0 ? _b : null); };
}
exports.createTypedRegex = createTypedRegex;
//# sourceMappingURL=utilities.js.map