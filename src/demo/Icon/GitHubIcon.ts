import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Proto} from 'typescript-proto-decorator';
import {DemoConf} from '../DemoConf';

@Component({
             changeDetection: ChangeDetectionStrategy.OnPush,
             selector:        'gh-icon',
             templateUrl:     './GitHubIcon.pug'
           })
export class GitHubIcon {

  @Proto(DemoConf.HOMEPAGE)
  public readonly homepage: string;

  @Proto(DemoConf.GITHUB_ICON_SIZE)
  public readonly iconSize: number;
}
