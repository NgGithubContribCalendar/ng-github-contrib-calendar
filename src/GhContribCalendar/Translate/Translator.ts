import {Injectable} from '@angular/core';
import {englishTranslations} from './defaultTranslations/en';
import {ltTranslations} from './defaultTranslations/lt';
import {russianTranslations} from './defaultTranslations/ru';
import {ContributionCountElement, ContributionCountElement as cce} from './types/ContributionCountElement';
import {ContributionCountOrder} from './types/ContributionCountOrder';
import {Locale} from './types/Locale';
import {Translation} from './types/Translation';
import {Translations} from './types/Translations';
import {TranslationSpec} from './types/TranslationSpec';

/** @internal */
function calculateOrder(input: ContributionCountOrder): ReadonlyArray<ContributionCountElement> {
  switch (input) {
    case ContributionCountOrder.DATE_TEXT_COUNT:
      return [cce.DATE, cce.TEXT, cce.COUNT];
    case ContributionCountOrder.COUNT_DATE_TEXT:
      return [cce.COUNT, cce.DATE, cce.TEXT];
    case ContributionCountOrder.TEXT_COUNT_DATE:
      return [cce.TEXT, cce.COUNT, cce.DATE];
    case ContributionCountOrder.TEXT_DATE_COUNT:
      return [cce.TEXT, cce.DATE, cce.COUNT];
    case ContributionCountOrder.DATE_COUNT_TEXT:
      return [cce.DATE, cce.COUNT, cce.TEXT];
    default:
      return [cce.COUNT, cce.TEXT, cce.DATE];
  }
}

/** A basic UI translator */
@Injectable()
export class Translator {

  /** Elements order */
  public order: ReadonlyArray<ContributionCountElement>;

  /** @internal */
  private previousRegistration: Partial<TranslationSpec>;

  private result: TranslationSpec;

  public constructor() {
    this.registerTranslations(englishTranslations);
  }

  /** Whether or not the number 0 should be hidden if there are no contributions on the given day */
  public get hideZero(): boolean {
    return this.result.hideZero;
  }

  /**
   * Register custom translations
   * @param tr The translations
   */
  public registerTranslations(tr: Partial<TranslationSpec>) {
    if (tr !== this.previousRegistration) {
      this.previousRegistration = tr;
      this.result = Object.assign({}, englishTranslations, tr || {});
      this.order = calculateOrder(this.result.order);
      Object.freeze(this.order);
    }
  }

  /**
   * Set a predefined locale
   * @param locale The locale
   * @throws {Error} If the locale is unknown
   */
  public setLocale(locale: Locale) {
    switch (locale) {
      case 'en':
        this.registerTranslations(englishTranslations);
        break;
      case 'ru':
        this.registerTranslations(russianTranslations);
        break;
      case 'lt':
        this.registerTranslations(ltTranslations);
        break;
      default:
        throw new Error(`Unknown locale: ${locale}`);
    }
  }

  /**
   * Translate a string
   * @param key The code/id to translate
   * @param qty If the translation is countable, the quantity
   * @returns The translated string
   * @throws {Error} If the key is unknown
   */
  public translate(key: keyof Translations, qty?: number): string {
    const tr: Translation = this.result[key];

    if (!tr) {
      throw new Error(`Unknown translation key: ${key}`);
    }

    if (typeof tr === 'string') {
      return tr;
    } else if (tr[qty]) {
      return tr[qty];
    } else if (tr.other) {
      return tr.other;
    }

    throw new Error(`Unable to find translation for key ${key} qty ${qty}`);
  }
}
