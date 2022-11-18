export interface PastClass {
    idBatchScheduleMapping: number;
    idClassSchedule: number;
    idBatch: number;
    classObject: ClassObject;
    active:boolean;
  }
  
  export interface FutureClass {
    idBatchScheduleMapping: number;
    idClassSchedule: number;
    idBatch: number;
    active:boolean;
    classObject: ClassObject;
  }
  export interface MaterialFetch {
    idClassMaterial: number;
    idTeacher: number;
    materialType: string;
    materialCategory?: any;
    materialName: string;
    materialTopic: string;
    materialDescription: string;
    materialFilePath: string;
    createdDate?: Date;
    mappingList: any[];
}
  export interface LiveClass {
    idBatchScheduleMapping: number;
    idClassSchedule: number;
    idBatch: number;
    classObject: ClassObject;
    active:boolean;
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
    createdDate?: any;
    mappingList: any[];
    classType: any;
    componentType : string;
    videoToBeRedirectToBlueJeans:boolean
    isNew:boolean
    blueJeansMetaData:BlueJeansMetaData
  }
  export class BlueJeansMetaData{
    id!:number;
    blueJeansMeetingId!:string ;
    participantPasscode!:string;
    moderatorPasscode!:string;
    classConfigId!:number;
  }