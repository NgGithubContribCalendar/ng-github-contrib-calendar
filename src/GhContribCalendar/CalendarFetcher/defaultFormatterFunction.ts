import {ProxyURLFormatterFunction} from './ProxyURLFormatterFunction';

export const defaultFormatterFunction: ProxyURLFormatterFunction =
  function(username: string, toYear?: string | number, toMonth?: string, toDay?: string): string {
    let url = `https://gh-contrib-parser-public.herokuapp.com/fetch/${username}`;

    if (toYear && toMonth && toDay) {
      url += `?to=${toYear}-${toMonth}-${toDay}`;
    }

    return url;
  };
