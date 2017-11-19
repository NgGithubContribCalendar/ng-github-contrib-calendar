//tslint:disable:no-magic-numbers
import {TestBed} from '@angular/core/testing';
import {isArray} from 'lodash';
import {def} from '../../../karma-test-entry';
import {CalendarFetcher} from './CalendarFetcher';
import {defaultFormatterFunction} from './defaultFormatterFunction';
import {FormattedPayload} from './Formatted';

describe('CalendarFetcher', () => {
  let inst: CalendarFetcher;

  beforeAll(() => {
    TestBed.configureTestingModule(def);
    inst = TestBed.get(CalendarFetcher);
  });

  describe('No fn, no date', () => {
    let data: FormattedPayload;

    beforeAll(async done => {
      data = await inst.fetch('Alorel').toPromise();
      done();
    });

    it('Months should be an array', () => {
      expect(isArray(data.months)).toBe(true);
    });

    it('Gs should be an array', () => {
      expect(isArray(data.gs)).toBe(true);
    });
  });

  describe('Fn, no date', () => {
    let data: FormattedPayload;

    beforeAll(async done => {
      data = await inst.fetch('Alorel', defaultFormatterFunction).toPromise();
      done();
    });

    it('Months should be an array', () => {
      expect(isArray(data.months)).toBe(true);
    });

    it('Gs should be an array', () => {
      expect(isArray(data.gs)).toBe(true);
    });
  });

  describe('No fn, with string year', () => {
    let data: FormattedPayload;

    beforeAll(async done => {
      data = await inst.fetch('Alorel', '1111', '11', '11').toPromise();
      done();
    });

    it('Months should be an array', () => {
      expect(isArray(data.months)).toBe(true);
    });

    it('Gs should be an array', () => {
      expect(isArray(data.gs)).toBe(true);
    });
  });

  describe('Fn, with string year', () => {
    let data: FormattedPayload;

    beforeAll(async done => {
      data = await inst.fetch('Alorel', '1111', '11', '11', defaultFormatterFunction)
                       .toPromise();
      done();
    });

    it('Months should be an array', () => {
      expect(isArray(data.months)).toBe(true);
    });

    it('Gs should be an array', () => {
      expect(isArray(data.gs)).toBe(true);
    });
  });

  describe('No fn, with num year', () => {
    let data: FormattedPayload;

    beforeAll(async done => {
      data = await inst.fetch('Alorel', 1111, '11', '11').toPromise();
      done();
    });

    it('Months should be an array', () => {
      expect(isArray(data.months)).toBe(true);
    });

    it('Gs should be an array', () => {
      expect(isArray(data.gs)).toBe(true);
    });
  });

  describe('Fn, with num year', () => {
    let data: FormattedPayload;

    beforeAll(async done => {
      data = await inst.fetch('Alorel', 1111, '11', '11', defaultFormatterFunction)
                       .toPromise();
      done();
    });

    it('Months should be an array', () => {
      expect(isArray(data.months)).toBe(true);
    });

    it('Gs should be an array', () => {
      expect(isArray(data.gs)).toBe(true);
    });
  });

  it('Nonexistent user', async done => {
    try {
      await inst.fetch(`${Math.random()}-${new Date().toLocaleString()}`).toPromise();
    } catch (e) {
      done();

      return;
    }

    throw new Error('Didn\'t throw');
  });
});
