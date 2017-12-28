import {ContributionCountOrder} from './ContributionCountOrder';
import {Translations} from './Translations';

/** A translation specification */
export interface TranslationSpec extends Translations {
  /** Whether or not the number 0 should be hidden if no contributions were made on the selected day */
  hideZero: boolean;

  /** The element ordering */
  order: ContributionCountOrder;
}
