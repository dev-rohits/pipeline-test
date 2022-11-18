export interface MobileCourseVO {
  courseImagePath?:string;
  idCourse: number;
  courseName: string;
  courseTitle?: string;
  courseImage?: string;
  weightedAverage: number;
  teacherName: string;
  teacherImage: string;
  level: string;
  status: string;
  batchId:number;
}
export class CourseDTO {
  idCourse!: string;
  idRequestedCourse!: string;
  idModifiedCourse!: string;
  idCourseCategory: any;
  idInstitution!: string;
  courseName!: string;
  courseDescription!: string;
  isLiveClassEnabled!: string;
  radioInput!: string;
  courseTitle!: string;
  whatStudentWillLearn!: string;
  whoThisCourseIsFor!: string;
  timePeriodCourse!: string;
  level!: string;
  coursePrice!: string;
  subjectSyllabus!: string;
  courseImage!: string;
  courseVideo!: string;
  displayOrder!: number;
  whetherAssignmentTestIncluded!: string;
  whetherStudyMaterialIncluded!: string;
  featured: boolean = false;
  courseVideoPath!: string;
  demoVideo!: string;
  demoVideoPath!: string;
  courseModuleList: any;
  sectionDesctionAttach!: string;
  courseAsPrivate!: boolean;
  // requestBy!!;
  coursePricingPlans!: string;
  teacherBio!: string;
  teacherImage!: string;
  metaDescription!:string;
  metaTags: string[] = [];
  isActive!:boolean;
}

export interface MobileCoursesRes {
  body: MobileCourseVO[];
}
