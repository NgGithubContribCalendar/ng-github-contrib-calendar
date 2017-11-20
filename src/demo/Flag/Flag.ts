import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gh-demo-flag',
  templateUrl: './Flag.pug'
})
export class Flag {

  @Input('flag')
  public flag: 'lt' | 'en' | 'ru';

  public get isValidFlag(): boolean {
    return this.flag === 'lt' || this.flag === 'en' || this.flag === 'ru';
  }
}
