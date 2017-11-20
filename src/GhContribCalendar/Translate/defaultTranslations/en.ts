import {deepFreeze} from '../../util/deepFreeze';
import {ContributionCountOrder} from '../types/ContributionCountOrder';
import {TranslationSpec} from '../types/TranslationSpec';

export const englishTranslations: TranslationSpec = {
  Apr:           'Apr',
  Aug:           'Aug',
  contributions: {
    0:     'No contributions on',
    1:     'contribution on',
    other: 'contributions on'
  },
  Dec:           'Dec',
  Feb:           'Feb',
  Friday:        'Fri',
  hideZero:      true,
  Jan:           'Jan',
  Jul:           'Jul',
  Jun:           'Jun',
  Mar:           'Mar',
  May:           'May',
  Monday:        'Mon',
  Nov:           'Nov',
  Oct:           'Oct',
  order:         ContributionCountOrder.COUNT_TEXT_DATE,
  Sep:           'Sep',
  Wednesday:     'Wed'
};

deepFreeze(englishTranslations);
