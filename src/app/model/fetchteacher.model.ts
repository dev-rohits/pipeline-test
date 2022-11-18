import { Body } from "./assignment";
import { FutureClass, LiveClass, MaterialFetch, PastClass } from "./enroll-classes";
import { CourseDTO } from "./MobileCourseVO";

export interface FetchSubjectListForStudent {
    subjectList: SubjectDTO[];
    notMappedClasses: NotMappedClass[];
    futureClasses: FutureClass[];
    pastClasses: PastClass[];
    liveClasses: LiveClass[];
    notMappedAssignments: Body[];
    notMappedMaterial:MaterialFetch[]
  }
  
  export interface SubjectDTO {
    idSubject: number;
    idCourse: number;
    subjectName: string;
    displayOrder: number;
    courseObj?: CourseDTO;
    topicList?: any;
  }
  export interface NotMappedClass {
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
    isVideoUploaded?: boolean;
    idCourse?: any;
    idSubject?: any;
    componentType: string;
    user?: any;
  }
 