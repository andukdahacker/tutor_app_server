import { Field, Int, ObjectType, createUnionType } from '@nestjs/graphql';

@ObjectType()
export class StringCursor {
  @Field()
  value: string;
}
@ObjectType()
export class IntCursor {
  @Field(() => Int)
  value: number;
}

export const Cursor = createUnionType({
  name: 'Cursor',
  types: () => [StringCursor, IntCursor] as const,
  resolveType: ({ value }) => {
    if (typeof value === 'string') {
      return StringCursor;
    } else if (typeof value === 'number') {
      return IntCursor;
    }
  },
});
