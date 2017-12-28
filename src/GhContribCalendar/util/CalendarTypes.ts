//tslint:disable:no-magic-numbers

/** A numeric month starting from 1 for January */
export type NumericMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
/** A string month starting from 1 for January, without the leading zero */
export type StringMonth = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
/** A string month starting from 1 for January, with the leading zero */
export type PaddedMonth = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';

/** A month */
export type Month = NumericMonth | StringMonth | PaddedMonth;

/** A numeric day of the month */
export type NumericDay = 1 |
  2 |
  3 |
  4 |
  5 |
  6 |
  7 |
  8 |
  9 |
  10 |
  11 |
  12 |
  13 |
  14 |
  15 |
  16 |
  17 |
  18 |
  19 |
  20 |
  21 |
  22 |
  23 |
  24 |
  25 |
  26 |
  27 |
  28 |
  29 |
  30 |
  31;

/** A string day of the month without the leading zero */
export type StringDay = '1' |
  '2' |
  '3' |
  '4' |
  '5' |
  '6' |
  '7' |
  '8' |
  '9' |
  '10' |
  '11' |
  '12' |
  '13' |
  '14' |
  '15' |
  '16' |
  '17' |
  '18' |
  '19' |
  '20' |
  '21' |
  '22' |
  '23' |
  '24' |
  '25' |
  '26' |
  '27' |
  '28' |
  '29' |
  '30' |
  '31';

/** A string day of the month with the leading zero */
export type PaddedDay = '01' |
  '02' |
  '03' |
  '04' |
  '05' |
  '06' |
  '07' |
  '08' |
  '09' |
  '10' |
  '11' |
  '12' |
  '13' |
  '14' |
  '15' |
  '16' |
  '17' |
  '18' |
  '19' |
  '20' |
  '21' |
  '22' |
  '23' |
  '24' |
  '25' |
  '26' |
  '27' |
  '28' |
  '29' |
  '30' |
  '31';

/** Day of the month */
export type Day = NumericDay | StringDay | PaddedDay;
