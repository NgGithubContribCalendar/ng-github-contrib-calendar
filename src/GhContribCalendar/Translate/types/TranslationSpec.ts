import {ContributionCountOrder} from './ContributionCountOrder';
import {Translations} from './Translations';

export interface TranslationSpec extends Translations {
  hideZero: boolean;
  order: ContributionCountOrder;
}
