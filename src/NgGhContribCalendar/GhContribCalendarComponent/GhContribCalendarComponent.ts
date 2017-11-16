import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gh-contrib-calendar',
  template: '<span>foo</span>'
})
export class GhContribCalendarComponent {

}
