import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gh-calendar-demo',
  template: '<span>foo</span>'
           })
export class DemoComponent {

}
