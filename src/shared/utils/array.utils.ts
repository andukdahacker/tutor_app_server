export class ArrayUtils {
  static last<T>(array: T[]): T {
    if (ArrayUtils.isEmpty(array)) {
      return null;
    }

    if (array.length > 0) {
      return array[array.length - 1];
    }

    return ArrayUtils.first(array);
  }

  static first<T>(array: T[]): T {
    return array[0];
  }

  static isEmpty<T>(array: T[]) {
    return array.length == 0;
  }
}
