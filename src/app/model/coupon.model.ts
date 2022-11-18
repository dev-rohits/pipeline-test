export interface Triallist {
    allowedConcurrentClasses: string;
   allowedStorage: string;
   allowedStudents: string;
   allowedTeachers: string;
   createdDate: Date;
   days: any;
   id: any;
   name: string;
   }
   export interface CouponList {
     id: string;
     type: string;
     couponFor:string;
     pricingPlanId: string;
     addonId: string;
     createdDate: string;
     startDate: Date;
     endDate: Date;
     generationType: string;
     remarks: string;
     userId: string;
     discount: string;
     noOfCoupens: string;
     code: string;
     typeOfSeries:string;
     coupenCodesVOs: CopencodeVo[];
   }
   export class couponVO {
    id!: string;
    type!: string;
    couponFor!: string;
    pricingPlanId!: string;
    addonId!: string;
    createdDate!: string;
    startDate!: Date;
    endDate!: Date;
    generationType!: string;
    remarks!: string;
    userId!: string;
    discount!: string;
    noOfCoupens!: string;
    code!: string;
    typeOfSeries!: string;
    discountType!:string;
    coupenCodesVOs!: CopencodeVo[];
    role: any;
  }
   export interface CopencodeVo {
     id: string;
     code: string;
     status: boolean;
     hold: boolean;
   }
   export interface RoleModel{
    roleId:number;
    roleName:string;
    idInstitution:number;
    roleType:string;
    
    
}