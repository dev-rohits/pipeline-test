import { BatchVO } from "./BatchVO";
import { PricingPlanVO } from "./PricingPlanVO";

export class Course {
  id!: number;
  courseName!: string;
  timePeriodCourse!: string;
  courseDescription!: string;
  subjectSyllabus!: string;
  courseImage!: string;
  metaTags: string[]=[];
  metaDescription!: string;
  demoVideo!: string;
  whetherAssignmentTestIncluded!: string;
  whetherStudyMaterialIncluded!: string;
  displayOrder!: number;
  isCertificateIncluded!: boolean;
  paymentType!: string;
  isCourseDetailsCompleted!: boolean;
  idInstitution!: number;
  categoryIds!:string[];
  subCategoryIds!:string[]
  subSubCategoryIds!:string[]
  hasTest!:string
  pricingPlans!:PricingPlanVO[];
  batches!:BatchVO[];
  courseImagePath!:string;
}
