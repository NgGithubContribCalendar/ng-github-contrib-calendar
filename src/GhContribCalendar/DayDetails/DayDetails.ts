import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Proto} from 'typescript-proto-decorator';
import {Translator} from '../Translate/Translator';
import {ContributionCountElement} from '../Translate/types/ContributionCountElement';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gh-contrib-calendar-details',
  styleUrls: ['./DayDetails.scss'],
  templateUrl: './DayDetails.pug'
})
export class DayDetails {

  @Proto(ContributionCountElement)
  public readonly ccEl: ContributionCountElement;

  @Input('count')
  public count: number;

  @Input('date')
  public date: Date;

  @Input('tr')
  public tr: Translator;
}
