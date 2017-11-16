import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IParsedPayload} from '@ng-github-contrib-calendar/common-types';
import {CachedItem, NgForageCache} from '@ngforage/ngforage-ng5';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {of} from 'rxjs/observable/of';
import {StaticConf} from '../util/StaticConf';
import {defaultFormatterFunction} from './defaultFormatterFunction';
import {ProxyURLFormatterFunction} from './ProxyURLFormatterFunction';

function makeCacheKey(user: string, y?: string | number, m?: string, d?: string): string {
  return JSON.stringify({user, y, m, d});
}

@Injectable()
export class CalendarFetcher {

  public constructor(private readonly cache: NgForageCache, private readonly http: HttpClient) {
    cache.cacheTime = StaticConf.CACHE_TIME;
    cache.name = StaticConf.STORE_NAME;
    cache.storeName = StaticConf.STORE_NAME;
    cache.description = 'GhContribCalendar store';
  }

  public fetch(user: string,
               toYear?: string | number,
               toMonth?: string,
               toDay?: string,
               formatterFn?: ProxyURLFormatterFunction): Observable<IParsedPayload> {
    const cacheKey: string = makeCacheKey(user, toYear, toMonth, toDay);

    return fromPromise(this.cache.getCached<IParsedPayload>(cacheKey))
      .switchMap((cached: CachedItem<IParsedPayload>) => {
        if (cached.hasData && (!cached.expired || navigator.onLine === false)) {
          return of(cached.data);
        }

        const url: string = (formatterFn || defaultFormatterFunction)(user, toYear, toMonth, toDay);
        const subj = new BehaviorSubject<IParsedPayload>(cached.hasData ? cached.data : null);

        setTimeout(() => {
          this.http.get<IParsedPayload>(
            url,
            {
              observe: 'body',
              reportProgress: false,
              responseType: 'json',
              withCredentials: false
            }
            )
            .switchMap(v => this.cache.setCached(cacheKey, v))
            .toPromise()
            .then(v => {
              subj.next(v);
              subj.complete();
            })
            .catch(e => {
              subj.error(e);
              subj.complete();
            });
        },         0);

        return subj.filter((v: IParsedPayload) => !!v);
      });
  }
}
