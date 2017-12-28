/** Ordering of day information elements */
export const enum ContributionCountOrder {
  /** Show the contributions count first, then the localised text, then the date */
  COUNT_TEXT_DATE = 0,
  /** Show the contributions count first, then the date, then the localised text */
  COUNT_DATE_TEXT = 1,
  /** Show the localised text first, then the contributions count, then the date */
  TEXT_COUNT_DATE = 2,
  /** Show the localised text first, then the date, then the contributions count */
  TEXT_DATE_COUNT = 3,
  /** Show the date first, then the contributions count, then the localised text */
  DATE_COUNT_TEXT = 4,
  /** Show the date first, then the localised text, then the contributions count */
  DATE_TEXT_COUNT = 5
}
