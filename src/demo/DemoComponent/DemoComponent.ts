import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgForage} from '@ngforage/ngforage-ng5';
import {DemoConf} from '../DemoConf';

@Component({
             changeDetection: ChangeDetectionStrategy.OnPush,
             providers:       [NgForage],
             selector:        'gh-calendar-demo',
             styleUrls:       ['./DemoComponent.scss'],
             templateUrl:     './DemoComponent.pug'
           })
export class DemoComponent implements OnInit {

  private _selectedTheme = 'light';

  public constructor(private readonly ngf: NgForage, private readonly cdr: ChangeDetectorRef) {
  }

  public get selectedTheme(): string {
    return this._selectedTheme;
  }

  public set selectedTheme(theme: string) {
    this._selectedTheme = theme;
    this.ngf.setItem(DemoConf.THEME_KEY, theme)
        .catch(console.error); // tslint:disable-line:no-unbound-method
  }

  public async ngOnInit() {
    this.ngf.name      = DemoConf.THEME_STORE;
    this.ngf.storeName = DemoConf.THEME_STORE;

    const prev = await this.ngf.getItem<string>(DemoConf.THEME_KEY);

    this.selectedTheme = prev === 'dark' || prev === 'light' ? prev : 'light';
    this.cdr.detectChanges();
  }
}
