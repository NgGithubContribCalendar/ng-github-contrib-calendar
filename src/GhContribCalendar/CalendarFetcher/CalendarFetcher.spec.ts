import {HttpClientModule} from '@angular/common/http';
//tslint:disable:no-magic-numbers
import {TestBed, TestModuleMetadata} from '@angular/core/testing';
import {NgForageModule} from '@ngforage/ngforage-ng5';
import {isArray} from 'lodash';
import {CalendarFetcher} from './CalendarFetcher';
import {defaultFormatterFunction} from './defaultFormatterFunction';
import {FormattedPayload} from './Formatted';

describe('CalendarFetcher', () => {
  let inst: CalendarFetcher;
  let data: FormattedPayload;

  const createInst = () => {
    const def: TestModuleMetadata = {
      imports:   [NgForageModule, HttpClientModule],
      providers: [CalendarFetcher]
    };
    TestBed.configureTestingModule(def);
    inst = TestBed.get(CalendarFetcher);
  };

  describe('No fn, no date', () => {
    beforeAll(async done => {
      createInst();
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
    beforeAll(async done => {
      createInst();
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
    beforeAll(async done => {
      createInst();
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
    beforeAll(async done => {
      createInst();
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
    beforeAll(async done => {
      createInst();
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
    beforeAll(async done => {
      createInst();
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
      createInst();
      await inst.fetch(`${Math.random()}-${new Date().toLocaleString()}`).toPromise();
    } catch (e) {
      done();

      return;
    }

    throw new Error('Didn\'t throw');
  });
});
