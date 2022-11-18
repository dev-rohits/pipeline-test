export interface ClassScheduleVOList {
  idClassSchedule: number;
  idInstitution: number;
  idTeacher: number;
  startDateStr?: any;
  endDateStr?: any;
  startDate: Date;
  endDate: Date;
  classTitle: string;
  classDescription: string;
  classLiveId:string
  classSubject: string;
  teacherName?: any;
  createdDate?: any;
  classType?: any;
  mappingList: any[];
}

export interface ClassMaterialObject {
  idClassMaterial: number;
  idTeacher: number;
  idInstitution: number;
  materialType: string;
  materialCategory: string;
  materialName: string;
  materialTopic: string;
  materialDescription: string;
  materialFilePath?: any;
  materialFileName: string;
  createdDate: Date;
  resumeTiming:any;
}

export interface RoleSet {
  roleId: number;
  roleName: string;
  idInstitution: number;
  screenMapping: any[];
  roleTypeId: number;
  roleType: string;
  screenArray?: any;
  bgColor?: any;
}

export interface User {
  id: number;
  firstName: string;
  lastName?: any;
  userName: string;
  email: string;
  password: string;
  sex: string;
  disabled: boolean;
  locked: boolean;
  roleId: number;
  mobileNumber?: any;
  userImage?: any;
  roleName?: any;
  roleSet: RoleSet;
  loginAttempts?: any;
  lastPwdChangeDate?: any;
  currentLoginDate?: any;
  lastLoginDate?: any;
}

export interface ClassObject {
  idClassSchedule: number;
  idInstitution: number;
  idTeacher: number;
  startDate: Date;
  endDate: Date;
  classTitle: string;
  classDescription: string;
  classSubject: string;
  createdDate: Date;
  classLiveId: string;
  classType: string;
  user: User;
}

export interface studentDetails {
  attendance: number;
  batchId: number;
  batchName:string;
  email:string;
  idUser:number;
  studentName:string;
  totalClasses:number;
}

export interface MappingList {
  idMaterialClassMapping: number;
  idClassMaterial: number;
  classLiveId:string;
  idClassSchedule: number;
  classMaterialObject: ClassMaterialObject;
  classObject: ClassObject;
}

export interface DataObjects {
  classScheduleVOList: ClassScheduleVOList[];
  mappingList: MappingList[];
}

export interface FetchMaterialMapping {
  dataObjects: DataObjects;
}
