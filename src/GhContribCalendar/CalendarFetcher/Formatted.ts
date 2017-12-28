import {IParsedPayload, IRect} from '@ng-github-contrib-calendar/common-types';

/** A formatted {@link IRect} where the date is of type {@link Date} */
export interface FormattedRect extends Pick<IRect, 'count' | 'fill'> {
  date: Date;
}

/** An array of {@link FormattedRect}s */
export type FormattedG = FormattedRect[];

/** A formatted {@link IParsedPayload} made up of {@link FormattedG}s */
export interface FormattedPayload extends Pick<IParsedPayload, 'months'> {
  gs: FormattedG[];
}
