export class UpdateWorkExperienceInput {
  workExperienceId: string;

  position: string;

  workplace: string;

  workplaceUrl?: string;

  description?: string;

  fromDate: Date;

  toDate: Date;
}
