import {IParsedPayload, IRect} from '@ng-github-contrib-calendar/common-types';

export interface FormattedRect extends Pick<IRect, 'count' | 'fill'> {
  date: Date;
}

export type FormattedG = FormattedRect[];

export interface FormattedPayload extends Pick<IParsedPayload, 'months'> {
  gs: FormattedG[];
}
