import { DateFilterList } from "aws-sdk/clients/inspector2";
import { Interface } from "readline";
import { scheduled } from "rxjs";

export interface ClassScheduleList {
  idClassSchedule: number;
  idInstitution?: number;
  idTeacher?: number;
  startDate: Date;
  endDate: Date;
  isNew: boolean;
  classTitle: string;
  classDescription: string;
  classLiveId:string;
  classSubject: string;
  teacherName?: any;
  createdDate?: any;
  classType:any;
  active:boolean;
  videoToBeUploadedOrNot:boolean;
  videoToBeRedirectToBlueJeans:boolean
  mappingList: any[];
  isDemoClass:any;
  metaTags?: string[];
}

export interface Data {
  classScheduleList: ClassScheduleList[];
}

export interface FetchScheduleList {
  data: Data;
}

export interface ClassConfiguration {
  id: number;
  repeatMeeting: boolean;
  days: number[];
  meetingEndDate: Date;
  meetingStartDate: Date;
  classSchedules: ClassScheduleList[];
  className: string;
  futureClassesDeleted: boolean;
  metaTags:string;

}
export interface ConfigurationLists {
  classConfigurationLists: ClassConfiguration[];
}

export interface ScheduleClass {
  idInstitution: number;
  idTeacher: number;
  startDate: string;
  endDate: string;
  classTitle: string;
  classDescription: string;
  classSubject: string;
  selectedDate: Date;
  startDateStr: any;
  idClassSchedule: any;
  classConfigId:any;
  endDateStr: any;
  classType: string;
  isNew: boolean;
  idCourse: string;
  isVideoUploaded:boolean;
  idSubject: string;
  videoToBeUploadedOrNot:boolean;
  topicArray: number[];
  meetingStartDate: Date;
  meetingEndDate:Date;
  days: number[];
  repeatMeeting:boolean;
  isDemoClass: boolean;
  isWebinar:boolean;
  videoToBeRedirectToBlueJeans:boolean;
  blueJeansClassMetaData:BlueJeansMetaData
  active?:boolean;
  metaTags?: string[];
}

export class ScheduleClass {
  idInstitution!: number;
  idTeacher!: number;
  startDate!: string;
  endDate!: string;
  classTitle!: string;
  classDescription!: string;
  classSubject!: string;
  selectedDate!: Date;
  startDateStr: any;
  idClassSchedule: any;
  classConfigId:any;
  endDateStr: any;
  classType!: string;
  isNew!: boolean;
  idCourse!: string;
  isVideoUploaded!: boolean;
  idSubject!: string;
  videoToBeUploadedOrNot!: boolean;
  topicArray!: number[];
  meetingStartDate!: Date;
  meetingEndDate!: Date;
  days!: number[];
  repeatMeeting:boolean=false;
  isDemoClass!: boolean;
  isWebinar!: boolean;
  videoToBeRedirectToBlueJeans!: boolean;
  blueJeansClassMetaData!: BlueJeansMetaData;
  active?:boolean;
  metaTags?: string[];
}

export interface BlueJeansMetaData{
  id:number
  blueJeansMeetingId:string
  participantPasscode:string
  moderatorPasscode:string
  classConfigId:number
}

export class ScheduleClassVO {
  idInstitution!: number;
  idTeacher!: number;
  teacherName!:string;
  startDate!: string;
  endDate!: string;
  classTitle!: string;
  classDescription!: string;
  classSubject!: string;
  selectedDate!: Date;
  startDateStr: any;
  idClassSchedule: any;
  classConfigId:any;
  endDateStr: any;
  classType!: string;
  isNew!: boolean;
  videoToBeUploadedOrNot!: boolean;
  meetingStartDate!: Date;
  meetingEndDate!: Date;
  days!: number[];
  repeatMeeting:boolean=false;
  videoToBeRedirectToBlueJeans!: boolean;
  blueJeansMetaData!: BlueJeansMetaData;
  active?:boolean;
  metaTags?: string[];
}
export interface scheduleClassVOList {
  scheduleClassVOList: ScheduleClassVO[];
}
export interface scheduledClassData{
  scheduledClassV2VO:scheduleClassVOList;
}
