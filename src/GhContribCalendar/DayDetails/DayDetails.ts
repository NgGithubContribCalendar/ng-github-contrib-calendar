import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Proto} from 'typescript-proto-decorator';
import {Translator} from '../Translate/Translator';
import {ContributionCountElement} from '../Translate/types/ContributionCountElement';

/** Details about the hovered day */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gh-contrib-calendar-details',
  styleUrls: ['./DayDetails.scss'],
  templateUrl: './DayDetails.pug'
})
export class DayDetails {

  /** @internal */
  @Proto(ContributionCountElement)
  public readonly ccEl: ContributionCountElement;

  /** Number of contributions on this day */
  @Input('count')
  public count: number;

  /** The hovered date */
  @Input('date')
  public date: Date;

  /** Translator service */
  @Input('tr')
  public tr: Translator;
}
