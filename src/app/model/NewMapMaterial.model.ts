import { StudentsForNotificationMapping } from './StudentsForNotificationMapping';

export interface TopicMap {
  id: number;
  topicName: string;
  selected: boolean;
}

export interface SubjectMap {
  id: number;
  subjectName: string;
  selected: boolean;
  fromDatabase: boolean;
  topicMap: TopicMap[];
}

export interface BatchMap {
  id: number;
  batchName: string;
  selected: boolean;
  startDate?: any;
  endDate?: any;
  fromDatabase: boolean;
  assignmentBatchMappingList?: {
    idAssignmentBatchMapping?: any;
    idBatch?: any;
    assignmentId?: any;
    createdDate?: any;
    startDate?: any;
    endDate?: any;
  }[];
}

export interface PricingPlanMap {
  id: number;
  planName: string;
  selected: boolean;
  batchMap: BatchMap[];
  fromDatabase: boolean;
}

export interface NewMapMaterialRes {
  id: number;
  courseName: string;
  selected: boolean;
  fromDatabase: boolean;
  subjectMap: SubjectMap[];
  pricingPlanMap: PricingPlanMap[];
}

export interface NotificationMappedBatches {
  id: number;
  courseName: string;
  batchName: string;
  fromDatabase: boolean;
  selected: boolean;
}
export interface NotificationMappingResponse {
  batches: NotificationMappedBatches[];
  students: StudentsForNotificationMapping[];
}
