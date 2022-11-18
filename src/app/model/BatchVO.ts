export interface BatchVO {
  idBatch: number;
  idPricingPlan: number;
  batchName: string;
  batchDescription: string;
  maxNoOfEnrollments: number;
  startDate: Date;
  endDate: Date;
  enrollCount: number;
  courseId: number;
  vacentSeats:number;
  batchCode:string;
  teacherIds:number[];
}

export interface BatchRes {
  body: BatchVO[];
}
