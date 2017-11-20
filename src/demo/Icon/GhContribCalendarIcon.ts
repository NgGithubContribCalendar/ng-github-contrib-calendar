import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Proto} from 'typescript-proto-decorator';
import {DemoConf} from '../DemoConf';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ghcc-icon',
  // tslint:disable-next-line:max-line-length
  template: '<svg [attr.height]="height" [attr.width]="width" xmlns="http://www.w3.org/2000/svg" style="isolation:isolate" viewBox="0 0 2 2"><defs><clipPath id="a"><path d="M0 0h2v2H0z"/></clipPath></defs><g clip-path="url(#a)"><path d="M0 0h2v2H0z"/><path fill="#196127" d="M0 0h1v1H0z"/><path fill="#239A3B" d="M1 0h1v1H1z"/><path fill="#C6E48B" d="M1 1h1v1H1zM0 1h1v1H0z"/><path fill="#7BC96F" d="M1 1h1v1H1z"/></g></svg>'
})
export class GhContribCalendarIcon {

  @Input('height')
  @Proto(DemoConf.MAIN_ICON_SIZE)
  public height: number;

  @Input('width')
  @Proto(DemoConf.MAIN_ICON_SIZE)
  public width: number;

}
