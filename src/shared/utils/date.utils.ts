export class DateUtils {
  static dateToTimeStamp(str: string) {
    return Date.parse(str) / 1000;
  }
}
