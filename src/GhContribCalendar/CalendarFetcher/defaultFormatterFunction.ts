import {StaticConf} from '../util/StaticConf';
import {ProxyURLFormatterFunction} from './ProxyURLFormatterFunction';

export const defaultFormatterFunction: ProxyURLFormatterFunction =
  function(username: string, toYear?: string | number, toMonth?: string, toDay?: string): string {
    let url = `${StaticConf.DEFAULT_PUBLIC_HOST}/${username}`;

    if (toYear && toMonth && toDay) {
      url += `?to=${toYear}-${toMonth}-${toDay}`;
    }

    return url;
  };
