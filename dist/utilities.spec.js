"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("./utilities");
describe('utilities', function () {
    describe('createTypedRegex', function () {
        const testRegex = (0, utilities_1.createTypedRegex)(/^a(?<group1>\d+)bcd(?<group2>\w+)f$/);
        it('should return the groups', function () {
            expect(testRegex('a123bcdTEXTf')).toEqual({ group1: '123', group2: 'TEXT' });
        });
        it('should return null it the regex does not match', function () {
            expect(testRegex('a123bcdTEXTfEXTRA')).toBeNull();
        });
        it('should return null if not groups are there', function () {
            expect((0, utilities_1.createTypedRegex)(/test/)('test')).toBeNull();
        });
    });
});
//# sourceMappingURL=utilities.spec.js.map