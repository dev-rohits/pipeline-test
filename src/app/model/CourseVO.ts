export interface CourseVO {
  idCourse: number;
  courseName: string;
  courseDescription: string;
  idInstitution:number;
  courseTitle: string;
  whatStudentWillLearn: string;
  whoThisCourseIsFor: string;
  timePeriodCourse: string;
  level: string;
  coursePrice: number;
  subjectSyllabus: string;
  courseImage: string;
  courseImagePath: string;
  courseVideo: string;
  demoVideo: string;
  courseLanguage: string;
  sectionDescription: string;
  courseVideoPath: string;
  metaTags: string;
  teacherName: string;
  displayOrder:number;
  featured:string;
  teacherImage: string;
  weightedAverage:number
  teacherImagePath: string;
  isStudent:boolean;
  paymentType:string;
  certificateIncluded:string;
  isLiveClassEnabled:string;
  metaDescription:string;
  whetherAssignmentTestIncluded:string;
  whetherStudyMaterialIncluded:string;
  courseAsPrivate:string;
  active:string;
  has_test:string;
  isCourseDetailsCompleted:boolean;
  courseModules: CourseModuleVO[];
}

export interface CourseModuleVO {
  idCourseModule: number;
  idCourse: number;
  moduleTitle: string;
  moduleDuration: string;
  dispalyOrder: string;
  moduleDurationType: string;
  courseModuleSectionsVO: CourseModuleSectionsVO[];
}

export interface CourseModuleSectionsVO {
  idCourseModuleSection: number;
  idCourseModule: number;
  dispalyOrder: string;
  moduleSectionTitle: string;
  moduleSectionDescription: string;
  moduleSectionDuration: string;
  moduleSectionDurationType: string;
}

export interface CourseRes {
  body: CourseVO;
}

export interface RecommendedCourseRes {
  body: CourseVO[];
}

export class CourseDTO {
  idCourse!: string;
  idRequestedCourse!: string;
  idModifiedCourse!: string;
  isCertificateIncluded:any;
  idCourseCategory: any;
  idInstitution!: any;
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
  requestBy:any;
  coursePricingPlans!: string;
  teacherBio!: string;
  teacherImage!: string;
  metaDescription!: string;
  metaTags: string[] = [];
  isActive!: boolean;
}
