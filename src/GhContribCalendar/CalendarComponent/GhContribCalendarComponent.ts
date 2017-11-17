import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IParsedPayload} from '@ng-github-contrib-calendar/common-types';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {CalendarFetcher} from '../CalendarFetcher/CalendarFetcher';
import {ProxyURLFormatterFunction} from '../CalendarFetcher/ProxyURLFormatterFunction';
import {Day, Month, NumericDay, NumericMonth} from '../util/CalendarTypes';

const currDate = new Date();

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gh-contrib-calendar',
  templateUrl: './GhContribCalendarComponent.pug'
})
export class GhContribCalendarComponent implements OnDestroy, OnInit {

  public readonly user$ = new BehaviorSubject<string>(null);
  public data: Observable<IParsedPayload>;

  /** @internal */
  private readonly y$ = new BehaviorSubject<number | string>(currDate.getUTCFullYear());
  /** @internal */
  private readonly m$ = new BehaviorSubject<Month>(<NumericMonth>(currDate.getUTCMonth() + 1));
  /** @internal */
  private readonly d$ = new BehaviorSubject<Day>(<NumericDay>currDate.getUTCDate());
  /** @internal */
  private readonly formatterFn$ = new BehaviorSubject<ProxyURLFormatterFunction>(null);

  public constructor(private readonly fetcher: CalendarFetcher) {

  }

  @Input('formatter-fn')
  public set formatterFn(fn: ProxyURLFormatterFunction) {
    this.formatterFn$.next(fn);
  }

  @Input('user')
  public set user(user: string) {
    this.user$.next(user);
  }

  @Input('y')
  public set year(v: number | string) {
    this.y$.next(v);
  }

  @Input('m')
  public set month(v: Month) {
    this.m$.next(v);
  }

  @Input('d')
  public set day(v: Day) {
    this.d$.next(v);
  }

  public ngOnInit(): void {
    this.data = combineLatest(
      this.user$.filter(v => !!v).distinctUntilChanged(),
      this.y$.distinctUntilChanged(),
      this.m$.map(formatAndPad).distinctUntilChanged(),
      this.d$.map(formatAndPad).distinctUntilChanged(),
      this.formatterFn$
    )
      .debounceTime(250) // tslint:disable-line:no-magic-numbers
      .switchMap((v: [string, string | number, string, string, ProxyURLFormatterFunction]) => {
        // tslint:disable-next-line:no-magic-numbers
        return this.fetcher.fetch(v[0], v[1], v[2], v[3], v[4]);
      });
  }

  public ngOnDestroy(): void {
    for (const s of [this.user$, this.y$, this.m$, this.d$, this.formatterFn$]) {
      s.complete();
      s.unsubscribe();
    }
  }
}

/** @internal */
function formatAndPad(v: Month | Day): string {
  const stringified: string = v.toString();

  return stringified.length === 1 ? '0' + stringified : stringified;
}
