import { createTypedRegex } from './utilities';

describe('utilities', function () {
  describe('createTypedRegex', function () {
    const testRegex = createTypedRegex(/^a(?<group1>\d+)bcd(?<group2>\w+)f$/);
    it('should return the groups', function () {
      expect(testRegex('a123bcdTEXTf')).toEqual({ group1: '123', group2: 'TEXT' });
    });
    it('should return null it the regex does not match', function () {
      expect(testRegex('a123bcdTEXTfEXTRA')).toBeNull();
    });
    it('should return null if not groups are there', function () {
      expect(createTypedRegex(/test/)('test')).toBeNull();
    });
  });
});
