/** @internal */
export function deepFreeze<T>(obj: T): T {
  for (const name of Object.getOwnPropertyNames(obj)) {
    const prop: any = obj[name];

    if (typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  }

  Object.freeze(obj);

  return obj;
}
