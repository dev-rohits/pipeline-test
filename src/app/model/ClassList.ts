import { ClassMaterialObject } from './material-mapping-list';

export class ClassList {
  classId?: number;
  className?: string;
}

export interface ClassDetailRootObject {
  data: recordedClassDetails;
}

export interface Data {
  assignments: Material[];
  tests: Material[];
  referenceMaterial: Material[];
  classVOObj: ClassVOObj;
  liveRecordings: Material[];
}

export interface recordedClassDetails {
  createdDat: Date;
  id: number;
  name: string;
  path: string;
  resumeTiming: number;
  type: string;
  classMaterialObject: ClassMaterialObject;
}

export interface ClassVOObj {
  idClassSchedule: number;
  idInstitution: number;
  idTeacher: number;
  startDate: Date;
  endDate: Date;
  classTitle: string;
  classDescription: string;
  classSubject: string;
  createdDate?: any;
  mappingList: any[];
  teacherName: string;
}

export interface Material {
  idMaterialClassMapping: number;
  idClassMaterial: number;
  idClassSchedule: number;
  classMaterialObject: ClassMaterialObject;
}
