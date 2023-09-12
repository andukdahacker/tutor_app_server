import { TransformFnParams } from 'class-transformer';
import { DateUtils } from './date.utils';

export const ToTimestamp = ({ value }: TransformFnParams) =>
  DateUtils.dateToTimeStamp(value);
