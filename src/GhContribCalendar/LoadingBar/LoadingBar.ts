import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gh-loading-bar',
  styleUrls: ['./LoadingBar.scss'],
  templateUrl: './LoadingBar.pug'
})
export class LoadingBar {

}
