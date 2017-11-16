// tslint:disable:unified-signatures
export interface ProxyURLFormatterFunction {
  (username: string): string;

  (username: string, toYear: string | number, toMonth: string, toDay: string): string;
}
