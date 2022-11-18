export interface SubscriptionPricingPlans {
    id: number;
    pricingPlanName: string;
    frequency: string;
    price: number;
    type:string;
    discountPrice: number;
    allowedStudents: number;
    allowedStorage:number;
    allowedTeachers: number;
    allowedConcurrentClasses:number;
    displayOrder:number;
    active:boolean;
    startDate:Date;
    affectiveStartDate: Date;
    endDate: Date;
    noOfDays:number;
    features:SubscriptionPricingPlansFeatures[]
  }
  export interface SubscriptionPricingPlansFeatures{
    id:number;
    featureName:string;
    featureDescription:string;
    displayOrder:string
  }
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