import {deepFreeze} from './deepFreeze';

describe('deepFreeze', () => {
  const obj = {
    bar: {
      qux: 'baz'
    },
    foo: 'a'
  };

  deepFreeze(obj);

  it('obj should be frozen', () => {
    expect(Object.isFrozen(obj)).toBe(true);
  });

  it('obj.bar should be frozen', () => {
    expect(Object.isFrozen(obj.bar)).toBe(true);
  });
});
