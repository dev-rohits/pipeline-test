export interface InstituteDetails {
  description: string;
  instituteImage: string;
  idInstitution: any;
  instituteName: string;
  institutionDescription: string;
  isPricing: any;
  latitude: any;
  image: string;
  metaDescription: string;
  teachersCount: number;
  weightedAverage: any;
  tags: any[];
  courseList: courseList[];
  teacherList: TeacherList[];
  mobileNumber:any;
  address:string;
}

export interface Data {
  instituteDetails: InstituteDetails[];
}
export interface FetchCourses {
  data: Data;
}

export interface courseList {
  idCourse: number;
  idCourseCategory: number;
  idInstitution: number;
  courseName: string;
  courseDescription: string;
  isLiveClassEnabled: string;
  courseTitle: string;
  whatStudentWillLearn: string;
  whoThisCourseIsFor: string;
  timePeriodCourse: string;
  level: string;
  coursePrice: number;
  subjectSyllabus?: any;
  courseImage: string;
  courseImagePath: string;
  institutionObj?: any;
  pricingPlanList?: any;
  subjectList?: any;
}

export interface TeacherList {
  idTeacher: number;
  teacherName: string;
  address: string;
  facebookPage: string;
  instaPage: string;
  youtubePage: string;
  teacherPage: string;
  teacherOneLineDescription: string;
  createdDate: Date;
  updatedDate?: any;
  userId: number;
  teacherImage: string;
  teacherImagePath: string;
  courseCount: number;
}
