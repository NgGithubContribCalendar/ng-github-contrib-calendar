import {TestBed} from '@angular/core/testing';
import {englishTranslations} from './defaultTranslations/en';
import {ltTranslations} from './defaultTranslations/lt';
import {russianTranslations} from './defaultTranslations/ru';
import {Translator} from './Translator';
import {ContributionCountElement as cce} from './types/ContributionCountElement';
import {ContributionCountOrder as cco} from './types/ContributionCountOrder';
import {TranslationSpec} from './types/TranslationSpec';

describe('Translator', () => {
  let inst: Translator;

  beforeEach(() => {
    TestBed.configureTestingModule({
                                     providers: [Translator]
                                   });

    inst = TestBed.get(Translator);
  });

  describe('calculateOrder', () => {
    it('DATE_TEXT_COUNT', () => {
      inst.registerTranslations({order: cco.DATE_TEXT_COUNT});

      expect(inst.order).toEqual([cce.DATE, cce.TEXT, cce.COUNT]);
    });

    it('COUNT_DATE_TEXT', () => {
      inst.registerTranslations({order: cco.COUNT_DATE_TEXT});

      expect(inst.order).toEqual([cce.COUNT, cce.DATE, cce.TEXT]);
    });

    it('TEXT_COUNT_DATE', () => {
      inst.registerTranslations({order: cco.TEXT_COUNT_DATE});

      expect(inst.order).toEqual([cce.TEXT, cce.COUNT, cce.DATE]);
    });

    it('TEXT_DATE_COUNT', () => {
      inst.registerTranslations({order: cco.TEXT_DATE_COUNT});

      expect(inst.order).toEqual([cce.TEXT, cce.DATE, cce.COUNT]);
    });

    it('DATE_COUNT_TEXT', () => {
      inst.registerTranslations({order: cco.DATE_COUNT_TEXT});

      expect(inst.order).toEqual([cce.DATE, cce.COUNT, cce.TEXT]);
    });

    it('DATE_COUNT_TEXT', () => {
      inst.registerTranslations({order: cco.COUNT_TEXT_DATE});

      expect(inst.order).toEqual([cce.COUNT, cce.TEXT, cce.DATE]);
    });
  });

  describe('hideZero', () => {
    it('Should be hidden', () => {
      inst.registerTranslations({hideZero: true});
      expect(inst.hideZero).toBe(true);
    });
    it('Should not be hidden', () => {
      inst.registerTranslations({hideZero: false});
      expect(inst.hideZero).toBe(false);
    });
  });

  describe('registerTranslations', () => {
    it('noarg', () => {
      inst.registerTranslations(<any>null);

      expect(inst['result']).toEqual(englishTranslations);
    });

    it('same obj', () => {
      const input = {hideZero: true};

      inst.registerTranslations(input);
      const r1: TranslationSpec = inst['result'];

      inst.registerTranslations(input);

      const r2: TranslationSpec = inst['result'];

      expect(r1).toBe(r2);
    });

    it('Merge', () => {
      inst.registerTranslations({Aug: __filename});

      expect(inst.translate('Aug')).toBe(__filename);
      expect(inst.translate('Apr')).toBe(englishTranslations.Apr);
    });
  });

  describe('setLocale', () => {
    it('ru', () => {
      inst.setLocale('ru');

      expect(inst['result']).toEqual(russianTranslations);
    });

    it('lt', () => {
      inst.setLocale('lt');

      expect(inst['result']).toEqual(ltTranslations);
    });

    it('en', () => {
      inst.setLocale('en');

      expect(inst['result']).toEqual(englishTranslations);
    });

    it('err', () => {
      expect(() => {
        inst.setLocale(<any>Math.random().toString());
      }).toThrowError(/^Unknown locale/);
    });
  });

  describe('translate', () => {
    it('invalid key', () => {
      expect(() => {
        inst.translate(<any>Math.random().toString());
      }).toThrowError(/^Unknown translation key/);
    });

    it('String', () => {
      expect(inst.translate('Apr')).toBe(englishTranslations.Apr);
    });

    it('Num', () => {
      expect(inst.translate('contributions', 0))
        .toBe(englishTranslations.contributions[0]);
    });

    it('Num (other)', () => {
      expect(inst.translate('contributions', Math.random()))
        .toBe(englishTranslations.contributions['other']);
    });

    it('No other definition', () => {
      inst.registerTranslations(<any>{contributions: {}});

      expect(() => {
        inst.translate('contributions', Math.random());
      }).toThrowError(/^Unable to find translation for key/);
    });
  });
});
