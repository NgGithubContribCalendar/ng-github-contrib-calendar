import {deepFreeze} from '../../util/deepFreeze';
import {ContributionCountOrder} from '../types/ContributionCountOrder';
import {TranslationSpec} from '../types/TranslationSpec';

export const russianTranslations: TranslationSpec = {
  Apr: 'Апр',
  Aug: 'Авг',
  contributions: {
    0: 'контрибуций небыло',
    other: 'контрибуций:'
  },
  Dec: 'Дек',
  Feb: 'Фев',
  Friday: 'Пят',
  hideZero: true,
  Jan: 'Янв',
  Jul: 'Июн',
  Jun: 'Июл',
  Mar: 'Мар',
  May: 'Май',
  Monday: 'Пон',
  Nov: 'Ноя',
  Oct: 'Окт',
  order: ContributionCountOrder.DATE_TEXT_COUNT,
  Sep: 'Сеп',
  Wednesday: 'Сре'
};

deepFreeze(russianTranslations);
