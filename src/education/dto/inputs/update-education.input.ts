export class UpdateEducationInput {
  id: string;

  educationEntity: string;

  educationEntityUrl?: string;

  fromDate: Date;

  toDate: Date;

  description?: string;
}
