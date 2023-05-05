import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateScalar', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description =
    '`Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch.';

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  serialize(value: Date): number {
    const dateToString = value.toString();
    const date = new Date(Date.parse(dateToString));
    return date.getTime(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
