import {HttpErrorResponse} from '@angular/common/http';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {NgForage} from '@ngforage/ngforage-ng5';
import {Locale} from '../../GhContribCalendar/Translate/types/Locale';
import {DemoConf} from '../DemoConf';

@Component({
             changeDetection: ChangeDetectionStrategy.OnPush,
             providers:       [NgForage],
             selector:        'gh-calendar-demo',
             styleUrls:       ['./DemoComponent.scss'],
             templateUrl:     './DemoComponent.pug'
           })
export class DemoComponent implements OnInit {

  public userToFetch      = 'Alorel';

  private _locale: Locale = 'en';

  private _selectedTheme  = 'light';

  public constructor(private readonly ngf: NgForage,
                     private readonly cdr: ChangeDetectorRef,
                     private snack: MatSnackBar) {
  }

  public get locale(): Locale {
    return this._locale;
  }

  public set locale(loc: Locale) {
    this._locale = loc;
    this.ngf.setItem(DemoConf.LOCALE_KEY, loc)
        .catch(console.error); // tslint:disable-line:no-unbound-method
  }

  public get selectedTheme(): string {
    return this._selectedTheme;
  }

  public set selectedTheme(theme: string) {
    this._selectedTheme = theme;
    this.ngf.setItem(DemoConf.THEME_KEY, theme)
        .catch(console.error); // tslint:disable-line:no-unbound-method
  }

  public handleError(e: HttpErrorResponse) {
    this.snack.open(
      `[${e.error}] ${e.message}`,
      null,
      {duration: 5000} // tslint:disable-line:no-magic-numbers
    );
  }

  public async ngOnInit() {
    this.ngf.name      = DemoConf.THEME_STORE;
    this.ngf.storeName = DemoConf.THEME_STORE;

    const prev$ = this.ngf.getItem<string>(DemoConf.THEME_KEY);
    const loc$  = this.ngf.getItem<Locale>(DemoConf.LOCALE_KEY);

    const prev = await prev$;

    this.selectedTheme = prev === 'dark' || prev === 'light' ? prev : 'light';
    this.cdr.detectChanges();

    let loc = await loc$;

    if (loc !== 'en' && loc !== 'lt' && loc !== 'ru') {
      loc = DemoConf.DEFAULT_LOCALE;
    }
    this.locale = loc;
    this.cdr.detectChanges();
  }
}
