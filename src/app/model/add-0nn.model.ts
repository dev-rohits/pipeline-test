export interface addOnPlan {
    id: number;
    addOnPlanName: string;
    price: number;
    discountPrice: number;
    allowedStudents: number;
    allowedStorage: number;
    allowedTeachers: number;
    allowedConcurrentClasses: number;
    displayOrder: number;
    createdDate: Date;
    endDate: string;
    startDate: string;
    type:string;
    features: addOnPlanFeatures[];
  }
  export interface addOnPlanFeatures {
    id: number;
    featureDescription: string;
    displayOrder: number;
  }