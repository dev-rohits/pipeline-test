export interface NewMapMaterialRes {
    id: number;
    courseName: string;
    selected: boolean;
    fromDatabase:boolean;
    subjectMap: SubjectMap[];
    pricingPlanMap: PricingPlanMap[];
  }
  export interface SubjectMap {
    id: number;
    subjectName: string;
    selected: boolean;
    topicMap: TopicMap[];
  }
  export interface TopicMap {
    id: number;
    topicName: string;
    selected: boolean;
  }
  export interface PricingPlanMap {
    id: number;
    planName: string;
    selected: boolean;
    batchMap: BatchMap[];
  }
  export interface BatchMap {
    id: number;
    batchName: string;
    selected: boolean;
    startDate?: any;
    endDate?: any;
    assignmentBatchMappingList?: {
      idAssignmentBatchMapping: any;
      idBatch: any;
      assignmentId: any;
      createdDate: any;
      startDate: any;
      endDate: any;
    }[];
  }
  