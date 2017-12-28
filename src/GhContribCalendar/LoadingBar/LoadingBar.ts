import {ChangeDetectionStrategy, Component} from '@angular/core';

/** An animated loading bar */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gh-loading-bar',
  styleUrls: ['./LoadingBar.scss'],
  templateUrl: './LoadingBar.pug'
})
export class LoadingBar {

}
