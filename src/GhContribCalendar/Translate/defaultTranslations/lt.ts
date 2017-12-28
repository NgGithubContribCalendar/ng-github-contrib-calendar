import {deepFreeze} from '../../util/deepFreeze';
import {ContributionCountOrder} from '../types/ContributionCountOrder';
import {TranslationSpec} from '../types/TranslationSpec';

/** Lithuanian translations translations */
export const ltTranslations: TranslationSpec = {
  Apr: 'Bal',
  Aug: 'Rug',
  contributions: {
    0: 'kontribucijų nebuvo',
    other: 'kontribucijų:'
  },
  Dec: 'Gru',
  Feb: 'Vas',
  Friday: 'Pen',
  hideZero: true,
  Jan: 'Sau',
  Jul: 'Lie',
  Jun: 'Bir',
  Mar: 'Kov',
  May: 'Geg',
  Monday: 'Pir',
  Nov: 'Lap',
  Oct: 'Spa',
  order: ContributionCountOrder.DATE_TEXT_COUNT,
  Sep: 'Rug',
  Wednesday: 'Tre'
};

deepFreeze(ltTranslations);
