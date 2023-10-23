import { Subject } from '@prisma/client';

export class SubjectEntity implements Subject {
  id: string;

  name: string;

  description: string;

  constructor(subject: SubjectEntity) {
    Object.assign(this, subject);
  }
}
