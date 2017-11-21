import {StaticConf} from '../util/StaticConf';

/** @internal */
export function defaultFormatterFunction(username: string,
                                         toYear?: string | number,
                                         toMonth?: string,
                                         toDay?: string): string {
  let url = `${StaticConf.DEFAULT_PUBLIC_HOST}/${username}`;

  if (toYear && toMonth && toDay) {
    url += `?to=${toYear}-${toMonth}-${toDay}`;
  }

  return url;
}
