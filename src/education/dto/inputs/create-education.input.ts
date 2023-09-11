export class CreateEducationInput {
  position: string;

  workplace: string;

  workplaceUrl?: string;

  description?: string;

  educationEntity: string;

  educationEntityUrl?: string;

  fromDate: Date;

  toDate: Date;
}
