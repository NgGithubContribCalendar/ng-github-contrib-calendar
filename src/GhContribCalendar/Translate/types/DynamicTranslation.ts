/** A countable/dynamic translation */
export interface DynamicTranslation {
  /** The translation if the number is not one of the given indices */
  other: string;

  /** The translation if the number is known */
  [num: number]: string;
}
