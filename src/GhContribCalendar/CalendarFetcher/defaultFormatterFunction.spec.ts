import {StaticConf} from '../util/StaticConf';
import {defaultFormatterFunction} from './defaultFormatterFunction';

describe('defaultFormatterFunction', () => {
  const expectedWYear = `${StaticConf.DEFAULT_PUBLIC_HOST}/Alorel?to=1111-11-11`;

  it('Only the username', () => {
    const actual = defaultFormatterFunction('Alorel');

    expect(actual).toBe(`${StaticConf.DEFAULT_PUBLIC_HOST}/Alorel`);
  });

  it('With numeric year', () => {
    // tslint:disable-next-line:no-magic-numbers
    const v = defaultFormatterFunction('Alorel', 1111, '11', '11');

    expect(v).toBe(expectedWYear);
  });

  it('With string year', () => {
    const v = defaultFormatterFunction('Alorel', '1111', '11', '11');

    expect(v).toBe(expectedWYear);
  });
});
