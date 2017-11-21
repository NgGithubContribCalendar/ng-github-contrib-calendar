export function testFormatterFn(username: string,
                                toYear?: string | number,
                                toMonth?: string,
                                toDay?: string) {
  let url = `http://127.0.0.1:5000/fetch/${username}`;

  if (toYear && toMonth && toDay) {
    url += `?to=${toYear}-${toMonth}-${toDay}`;
  }

  return url;
}
