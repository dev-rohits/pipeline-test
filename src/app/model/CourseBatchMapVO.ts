import { NonNullableBoolean } from 'aws-sdk/clients/chime';

export class CourseBatchMapVO {
  id!: number;
  name!: string;
  selected!: boolean;
  preSelected!: boolean;
  batches!: BatchMapping[];
}

export class BatchMapping {
  id!: number;
  name!: string;
  selected!: boolean;
  preSelected!: boolean;
}
