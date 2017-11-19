import {ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {IRect} from '@ng-github-contrib-calendar/common-types';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {CalendarFetcher} from '../CalendarFetcher/CalendarFetcher';
import {FormattedPayload} from '../CalendarFetcher/Formatted';
import {ProxyURLFormatterFunction} from '../CalendarFetcher/ProxyURLFormatterFunction';
import {Translator} from '../Translate/Translator';
import {TranslationSpec} from '../Translate/types/TranslationSpec';
import {Day, Month, NumericDay, NumericMonth} from '../util/CalendarTypes';
import {StaticConf} from '../util/StaticConf';

const currDate = new Date();
currDate.setUTCHours(0, 0, 0, 0);

@Component({
             changeDetection: ChangeDetectionStrategy.OnPush,
             providers:       [Translator, CalendarFetcher],
             selector:        'gh-contrib-calendar',
             styleUrls:       ['./GhContribCalendarComponent.scss'],
             templateUrl:     './GhContribCalendarComponent.pug'
           })
export class GhContribCalendarComponent implements OnDestroy, OnInit {

  /** @internal */
  public _enteredRect: IRect;
  /** @internal */
  public data: Observable<FormattedPayload>;
  @Input('show-controls')
  public showControls   = true;
  /** @internal */
  public readonly tr: Translator;
  public readonly user$ = new BehaviorSubject<string>(null);
  /** @internal */
  private readonly d$   = new BehaviorSubject<Day>(<NumericDay>currDate.getUTCDate());

  /** @internal */
  private readonly fetcher: CalendarFetcher;

  /** @internal */
  private readonly formatterFn$ = new BehaviorSubject<ProxyURLFormatterFunction>(null);

  /** @internal */
  private readonly m$ = new BehaviorSubject<Month>(<NumericMonth>(currDate.getUTCMonth() + 1));
  /** @internal */
  private readonly y$ = new BehaviorSubject<number | string>(currDate.getUTCFullYear());

  public constructor(@Inject(CalendarFetcher) fetcher: CalendarFetcher, @Inject(Translator) tr: Translator) {
    this.tr      = tr;
    this.fetcher = fetcher;
  }

  public get atMaxRange(): boolean {
    return currDate.getTime() === this.toDate.getTime();
  }

  public get day(): Day {
    return this.d$.value;
  }

  @Input('d')
  public set day(v: Day) {
    this.d$.next(v);
  }

  public get formatterFn(): ProxyURLFormatterFunction {
    return this.formatterFn$.value;
  }

  @Input('formatter-fn')
  public set formatterFn(fn: ProxyURLFormatterFunction) {
    if (!fn || typeof fn === 'function') {
      this.formatterFn$.next(fn);
    } else {
      throw new Error('formatter-fn must be falsy or a function');
    }
  }

  public get month(): Month {
    return this.m$.value;
  }

  @Input('m')
  public set month(v: Month) {
    this.m$.next(v);
  }

  @Input('to')
  public set to(v: Date | string) {
    if (typeof v === 'string' && /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/.test(v)) {
      const spl: string[] = v.split('-');
      this.year           = spl[0];
      this.month          = <Month>spl[2]; // tslint:disable-line:no-magic-numbers
      this.day            = <Day>spl[3]; // tslint:disable-line:no-magic-numbers
    } else if (v instanceof Date) {
      this.year  = v.getFullYear();
      this.month = <Month>(v.getMonth() + 1);
      this.day   = <Day>v.getDate();
    }
  }

  @Input('translations')
  public set translations(val: Partial<TranslationSpec>) {
    this.tr.registerTranslations(val);
  }

  public get user(): string {
    return this.user$.value;
  }

  @Input('user')
  public set user(user: string) {
    this.user$.next(user);
  }

  public get year(): number | string {
    return this.y$.value;
  }

  @Input('y')
  public set year(v: number | string) {
    this.y$.next(v);
  }

  /** @internal */
  private get toDate(): Date {
    const d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    d.setFullYear(
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

  /** @internal */
  public ngOnInit(): void {
    this.data = combineLatest(
      this.user$.distinctUntilChanged(),
      this.y$.distinctUntilChanged(),
      this.m$.map(formatAndPad).distinctUntilChanged(),
      this.d$.map(formatAndPad).distinctUntilChanged(),
      this.formatterFn$
    )
      .filter((v: any[]) => !!v[0])
      .debounceTime(StaticConf.FETCH_DEBOUNCE_TIME)
      .switchMap((v: [string, string | number, string, string, ProxyURLFormatterFunction]) => {
        // tslint:disable-next-line:no-magic-numbers
        return this.fetcher.fetch(v[0], v[1], v[2], v[3], v[4]);
      });
  }
}

/** @internal */
function formatAndPad(v: Month | Day): string {
  const stringified: string = v.toString();

  return stringified.length === 1 ? '0' + stringified : stringified;
}
