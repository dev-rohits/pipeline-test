export interface BatchMappingVO {
  id: number;
  batchName: string;
  batchImage: string;
  selected: boolean;
}


export interface Data {
  BatchList: BatchList[];
}
export interface BatchList {
  idBatch: number;
  idPricingPlan: number;
  batchName: string;
  batchDescription: string;
  maxNoOfEnrollments: number;
  startDate: Date;
  pricingPlanName:string;
  endDate: Date;
  courseId:number;
}
