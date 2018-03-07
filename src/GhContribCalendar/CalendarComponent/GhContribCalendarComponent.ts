import {HttpErrorResponse} from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {IRect} from '@ng-github-contrib-calendar/common-types';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {of} from 'rxjs/observable/of';
import {CalendarFetcher} from '../CalendarFetcher/CalendarFetcher';
import {FormattedPayload} from '../CalendarFetcher/Formatted';
import {ProxyURLFormatterFunction} from '../CalendarFetcher/ProxyURLFormatterFunction';
import {Translator} from '../Translate/Translator';
import {Locale} from '../Translate/types/Locale';
import {TranslationSpec} from '../Translate/types/TranslationSpec';
import {Day, Month, NumericDay, NumericMonth} from '../util/CalendarTypes';
import {StaticConf} from '../util/StaticConf';

/** @internal */
const currDate = new Date();
currDate.setUTCHours(0, 0, 0, 0);

/** The main calendar component */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Translator, CalendarFetcher],
  selector: 'gh-contrib-calendar',
  styleUrls: ['./GhContribCalendarComponent.scss'],
  templateUrl: './GhContribCalendarComponent.pug'
})
export class GhContribCalendarComponent implements OnDestroy, OnInit {

  /** @internal */
  public _enteredRect: IRect;

  /** @internal */
  public _numLoading = 0;

  /** @internal */
  public data: Observable<FormattedPayload>;

  /** Any errors that occurred */
  @Output('error')
  public readonly error = new EventEmitter<HttpErrorResponse>();

  /** Whether or not the controls for changing the year should be shown */
  @Input('show-controls')
  public showControls = true;

  /** @internal */
  public readonly tr: Translator;

  /** @internal */
  public readonly user$ = new BehaviorSubject<string>(null);

  /** @internal */
  private readonly cdr: ChangeDetectorRef;

  /** @internal */
  private readonly d$ = new BehaviorSubject<Day>(<NumericDay>currDate.getUTCDate());

  /** @internal */
  private readonly fetcher: CalendarFetcher;

  /** @internal */
  private readonly formatterFn$ = new BehaviorSubject<ProxyURLFormatterFunction>(null);

  /** @internal */
  private readonly m$ = new BehaviorSubject<Month>(<NumericMonth>(currDate.getUTCMonth() + 1));

  /** @internal */
  private readonly y$ = new BehaviorSubject<number | string>(currDate.getUTCFullYear());

  public constructor(@Inject(ChangeDetectorRef) cdr,
                     @Inject(CalendarFetcher) fetcher: CalendarFetcher,
                     @Inject(Translator) tr: Translator) {
    this.tr = tr;
    this.fetcher = fetcher;
    this.cdr = cdr;
  }

  /** Whether or not the entered date is today */
  public get atMaxRange(): boolean {
    return currDate.getTime() === this.toDate.getTime();
  }

  /** The entered day getter */
  public get day(): Day {
    return this.d$.value;
  }

  /** The entered day setter */
  @Input('d')
  public set day(v: Day) {
    this.d$.next(v);
  }

  /** Proxy formatter function getter */
  public get formatterFn(): ProxyURLFormatterFunction {
    return this.formatterFn$.value;
  }

  /** Proxy formatter function setter */
  @Input('formatter-fn')
  public set formatterFn(fn: ProxyURLFormatterFunction) {
    if (!fn || typeof fn === 'function') {
      this.formatterFn$.next(fn);
    } else {
      throw new Error('formatter-fn must be falsy or a function');
    }
  }

  /** Locale setter */
  @Input('locale')
  public set locale(val: Locale) {
    this.tr.setLocale(val);
  }

  /** Entered month getter */
  public get month(): Month {
    return this.m$.value;
  }

  /** Entered month setter */
  @Input('m')
  public set month(v: Month) {
    this.m$.next(v);
  }

  /** Entered date setter */
  @Input('to')
  public set to(v: Date | string) {
    if (typeof v === 'string' && /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/.test(v)) {
      const spl: string[] = v.split('-');
      this.year = spl[0];
      this.month = <Month>spl[1]; // tslint:disable-line:no-magic-numbers
      this.day = <Day>spl[2]; // tslint:disable-line:no-magic-numbers
    } else if (v instanceof Date) {
      this.year = v.getUTCFullYear();
      this.month = <Month>(v.getUTCMonth() + 1);
      this.day = <Day>v.getUTCDate();
    }
  }

  /** Custom translations setter */
  @Input('translations')
  public set translations(val: Partial<TranslationSpec>) {
    this.tr.registerTranslations(val);
  }

  /** Entered user getter */
  public get user(): string {
    return this.user$.value;
  }

  /** Entered user setter */
  @Input('user')
  public set user(user: string) {
    if (this.user && user !== this.user) {
      this.to = currDate;
    }

    this.user$.next(user);
  }

  /** Entered year getter */
  public get year(): number | string {
    return this.y$.value;
  }

  /** Entered year setter */
  @Input('y')
  public set year(v: number | string) {
    this.y$.next(v);
  }

  /** @internal */
  public get numLoading(): number {
    return this._numLoading;
  }

  /** @internal */
  public set numLoading(num: number) {
    this._numLoading = num;
    this.cdr.detectChanges();
  }

  /** @internal */
  private get toDate(): Date {
    const d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    d.setUTCFullYear(
      parseInt(<string>this.year, StaticConf.STD_RADIX),
      parseInt(<string>this.month, StaticConf.STD_RADIX) - 1,
      parseInt(<string>this.day, StaticConf.STD_RADIX)
    );

    return d;
  }

  public ngOnDestroy(): void {
    for (const s of [this.user$, this.y$, this.m$, this.d$, this.formatterFn$]) {
      s.complete();
      s.unsubscribe();
    }
  }

  /** @internal */
  public ngOnInit(): void {
    this.setupData();
  }

  /** @internal */
  public transformAtIndex(index: number): string {
    return `translate(${index * StaticConf.OUTER_G_TRANSFORM_MULTIPLIER},0)`;
  }

  /** @internal */
  public updateRange(dir: 1 | -1) {
    if (dir === -1) {
      this.y$.next(parseInt(<string>this.year, StaticConf.STD_RADIX) - 1);
    } else {
      const td = this.toDate;
      td.setUTCFullYear(td.getUTCFullYear() + 1);

      this.to = td > currDate ? currDate : td;
    }
  }

  private setupData(): void {
    const decrease = () => {
      this.numLoading--;
    };

    const data = combineLatest(
      this.user$.distinctUntilChanged(),
      this.y$.distinctUntilChanged(),
      this.m$.map(formatAndPad).distinctUntilChanged(),
      this.d$.map(formatAndPad).distinctUntilChanged(),
      this.formatterFn$
    )
      .filter((v: any[]) => !!v[0])
      .debounceTime(StaticConf.FETCH_DEBOUNCE_TIME)
      .switchMap((v: [string, string | number, string, string, ProxyURLFormatterFunction]) => {
        this.numLoading++;
        // tslint:disable-next-line:no-magic-numbers
        const r = this.fetcher.fetch(v[0], v[1], v[2], v[3], v[4]).share();

        r.toPromise().then(decrease).catch(decrease);

        return r;
      })
      .catch((e: HttpErrorResponse) => {
        this.error.emit(e);
        this.user$.next(null);
        setTimeout(
          () => {
            this.setupData();
          },
          0
        );

        return of(null);
      });

    this.data = data.filter(v => !!v).share();
  }
}

/** @internal */
function formatAndPad(v: Month | Day): string {
  const stringified: string = v.toString();

  return stringified.length === 1 ? '0' + stringified : stringified;
}
