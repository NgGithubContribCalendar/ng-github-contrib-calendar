// tslint:disable:unified-signatures max-line-length
/**
 * A function that formats a username and, optionally, a date into a URL that will be AJAX'd to get the data.
 * The URL should be running a server that returns properly formatted data, such as
 * {@link https://github.com/NgGithubContribCalendar/server}
 */
export interface ProxyURLFormatterFunction {
  /**
   * Format the username into a URL
   * @param username The username to format
   * @returns A URL that will be AJAX'd to get the data. The URL should be running a server that returns properly formatted data, such as {@link https://github.com/NgGithubContribCalendar/server}
   */
  (username: string): string;

  /**
   * Format the username into a URL
   * @param username The username to format
   * @param toYear The cutoff year as a number or string
   * @param toMonth The cutoff month with a leading zero, e.g. 01 for January.
   * @param toDay The cutoff day with the leading zero, e.g. 05.
   * @returns A URL that will be AJAX'd to get the data. The URL should be running a server that returns properly formatted data, such as {@link https://github.com/NgGithubContribCalendar/server}
   */
  (username: string, toYear: string | number, toMonth: string, toDay: string): string;
}
