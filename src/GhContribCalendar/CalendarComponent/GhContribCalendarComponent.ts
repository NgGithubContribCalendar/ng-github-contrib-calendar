import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gh-contrib-calendar',
  template: 'foo'
})
export class GhContribCalendarComponent {

}