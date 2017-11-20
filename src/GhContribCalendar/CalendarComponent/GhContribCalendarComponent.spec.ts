//tslint:disable:no-magic-numbers
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed, TestModuleMetadata} from '@angular/core/testing';
import {NgForageModule} from '@ngforage/ngforage-ng5';
import * as Bluebird from 'bluebird';
import {Chevron} from '../Chevron/Chevron';
import {DayDetails} from '../DayDetails/DayDetails';
import {LoadingBar} from '../LoadingBar/LoadingBar';
import {englishTranslations} from '../Translate/defaultTranslations/en';
import {ltTranslations} from '../Translate/defaultTranslations/lt';
import {russianTranslations} from '../Translate/defaultTranslations/ru';
import {Translator} from '../Translate/Translator';
import {Day, Month} from '../util/CalendarTypes';
import {StaticConf} from '../util/StaticConf';
import {GhContribCalendarComponent} from './GhContribCalendarComponent';

/*
 todo:
 props
 html
 */

describe('GhContribCalendarComponent', () => {
  let fx: ComponentFixture<GhContribCalendarComponent>;
  let inst: GhContribCalendarComponent;
  let dbg: DebugElement;
  let tr: Translator;

  const privates = {
    get toDate(): Date {
      return inst['toDate'];
    },
    get numLoading(): number {
      return inst['numLoading'];
    },
    set numLoading(num: number) {
      inst['numLoading'] = num;
    }
  };

  beforeEach(async done => {
    const def: TestModuleMetadata = {
      declarations: [
        GhContribCalendarComponent,
        Chevron,
        DayDetails,
        LoadingBar
      ],
      imports:      [
        HttpClientModule,
        CommonModule,
        NgForageModule
      ]
    };

    await TestBed.configureTestingModule(def).compileComponents();
    fx   = TestBed.createComponent(GhContribCalendarComponent);
    inst = fx.componentInstance;
    dbg  = fx.debugElement;
    tr   = inst.tr;

    done();
  });

  describe('atMaxRange', () => {
    it('Should be true initially', () => {
      expect(inst.atMaxRange).toBe(true);
    });

    it('Should be true after setting to now', () => {
      inst.to = new Date();
      fx.detectChanges();
      expect(inst.atMaxRange).toBe(true);
    });

    it('Should be false after setting to past date', () => {
      const d = new Date();
      d.setUTCFullYear(2017, 1, 1);

      inst.to = d;
      fx.detectChanges();
      expect(inst.atMaxRange).toBe(false);
    });
  });

  it('day', () => {
    const tomorrow = new Date(Date.now() + 3600 * 24 * 1000);
    const day      = <Day>tomorrow.getUTCDate();

    inst.day = day;
    expect(inst.day).toBe(day);
  });

  describe('formatterFn', () => {
    it('invalid fn', () => {
      const call = () => {
        inst.formatterFn = <any>'foo';
      };
      expect(call).toThrowError('formatter-fn must be falsy or a function');
    });

    it('No fn', () => {
      inst.formatterFn = null;
      expect(inst.formatterFn).toBeNull();
    });

    it('Actual fn', () => {
      // tslint:disable-next-line:no-empty
      const fn: any    = () => {
      };
      inst.formatterFn = fn;

      expect(inst.formatterFn).toBe(fn);
    });
  });

  describe('locale', () => {
    it('en', () => {
      inst.locale = 'en';

      expect(tr.translate('Apr')).toBe(englishTranslations.Apr);
    });

    it('ru', () => {
      inst.locale = 'ru';

      expect(tr.translate('Apr')).toBe(russianTranslations.Apr);
    });

    it('lt', () => {
      inst.locale = 'lt';

      expect(tr.translate('Apr')).toBe(ltTranslations.Apr);
    });
  });

  it('month', () => {
    const m: Month = new Date().getUTCMonth() === 0 ? '2' : '1';

    inst.month = m;
    expect(inst.month).toBe(m);
  });

  describe('to', () => {
    let initialTo: Date;

    beforeEach(() => {
      initialTo = privates.toDate;
    });

    it('Invalid string', () => {
      inst.to = 'foo';
      expect(privates.toDate).toEqual(initialTo);
    });

    describe('valid string', () => {
      beforeEach(() => {
        inst.to = '2017-01-02';
      });

      it('year', () => expect(inst.year).toBe('2017'));
      it('mth', () => expect(inst.month).toBe('01'));
      it('day', () => expect(inst.day).toBe('02'));
    });

    it('Date', () => {
      const d1 = new Date();
      const d2 = new Date();
      d1.setUTCHours(0, 0, 0, 0);

      d1.setUTCFullYear(initialTo.getUTCFullYear() + 1);
      d2.setUTCFullYear(initialTo.getUTCFullYear() + 1);
      inst.to = d2;

      expect(privates.toDate).toEqual(d1);
    });
  });

  it('translations', () => {
    inst.translations = {Mar: __filename};
    expect(tr.translate('Mar')).toBe(__filename);
  });

  describe('user', () => {
    let past: Date;
    let now: Date;

    const setDate = () => {
      past = new Date();
      past.setUTCHours(0, 0, 0, 0);
      past.setUTCFullYear(2016);
      inst.to = past;
    };

    beforeEach(setDate);
    beforeEach(() => {
      now = new Date();
      now.setUTCHours(0, 0, 0, 0);
    });

    it('falsy user', () => {
      inst.user = '';
      expect(inst.user).toBe('');
      expect(privates.toDate).toEqual(past);
    });

    it('regular user', () => {
      inst.user = __filename;
      expect(inst.user).toBe(__filename);
      expect(privates.toDate).toEqual(past);
    });

    it('duplicate user', () => {
      inst.user = __filename;

      expect(inst.user).toBe(__filename);
      expect(privates.toDate).toEqual(past);

      setDate();
      expect(privates.toDate).toEqual(past);

      inst.user = __filename;
      expect(privates.toDate).toEqual(past);

      inst.user = __dirname;
      expect(inst.user).toBe(__dirname);
      expect(privates.toDate).toEqual(now);
    });
  });

  it('year', () => {
    inst.year = '2015';
    expect(inst.year).toBe('2015');
  });

  describe('transformAtIndex', () => {
    const multiplier = 13;
    const lower      = -1;
    const upper      = 1;

    for (let i = lower; i <= upper; i++) {
      it(`At index ${i}`, () => {
        const r        = inst.transformAtIndex(i);
        const expected = `translate(${i * multiplier},0)`;

        expect(r).toBe(expected);
      });
    }
  });

  describe('updateRange', () => {
    it('-1', () => {
      inst.updateRange(-1);
      expect(inst.year).toBe(new Date().getUTCFullYear() - 1);
    });

    describe('1', () => {
      let initial: number;

      beforeEach(() => {
        initial = parseInt(<any>inst.year, StaticConf.STD_RADIX);
      });

      it('At max range', () => {
        inst.updateRange(1);
        expect(inst.year).toBe(initial);
      });

      it('Not at max range', () => {
        inst.year = initial - 5;
        inst.updateRange(1);
        expect(inst.year).toBe(initial - 4);
      });
    });
  });

  it('numLoading', async done => {
    expect(privates.numLoading).toBe(0, 'initial');
    inst.user = 'Alorel';
    fx.detectChanges();
    await Bluebird.delay(StaticConf.FETCH_DEBOUNCE_TIME + 5);
    expect(privates.numLoading).toBe(1, 'post-CD');
    await fx.whenStable();

    fx.detectChanges();
    expect(privates.numLoading).toBe(0, 'whenStable');

    done();
  });
});
