export interface FeaturedCourse {
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

export interface FeatureCoursesRes {
  featuredCourses: FeaturedCourse[];
}
