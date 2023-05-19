export class ArrayUtils {
  static last<T>(array: T[]): T {
    return array[array.length - 1];
  }
}
