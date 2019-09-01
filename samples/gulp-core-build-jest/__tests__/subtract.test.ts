import {subtract} from '../src/subtract';

describe('subtract', () => {
  it('should subtract two numbers', () => {
    expect(subtract(3, 2)).toEqual(1);
  });
});
