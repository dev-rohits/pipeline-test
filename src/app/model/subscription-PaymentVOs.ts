import { items } from "./Subscription";

export class SubscriptionPlanOrderRequest {
    amount!: number;
    planId!: any;
    transactionId!: number;
    coupenCode?: string;
    addonIds!: number[];
    instituteId!: number;
  }
  
  export class SubscriptionPlanTransactionVO {
    id!: number;
    userId!: number;
    planId!: number;
    orderStatus!: string;
    paymentStatus!: string;
    amount!: number;
    netamount!: number;
    orderCreatedAt!: Date;
    paymentCreatedAt!: Date;
    amountDue!: number;
    receipt!: string;
    currency!: string;
    orderId!: string;
    orderAttempts!: number;
    gst!: number;
    sgstInAmount!: number;
    discount!: number;
    cgstInAmount!: number;
    igstInAmount!: number;
    gstInAmount!: number;
    cgst!: number;
    sgst!: number;
    igst!: number;
    cess!: number;
    sac!: number;
    invoiceId!: number;
    items!: items[];
  }

  export class planlist {
    active!: boolean;
    allowedConcurrentClasses: any;
    allowedStorage: any;
    allowedStudents: any;
    allowedTeachers: any;
    createdDate!: Date;
    discountPrice!: number;
    displayOrder!: number;
    features!: any[];
    frequency: any;
    id!: number;
    noOfDays: any;
    price!: number;
    pricingPlanName: any;
    type: any;
    expand!: false;
    addOnPlanName: any;
  }
  
  export class SubscriptionPlanOrderItemsVO {
    id!: number;
    type!: string;
    name!: string;
    itemId!: number;
    price!: number;
  }

  export class addonns {
    id!: number;
    addOnPlanName: any;
    createdDate!: Date;
    displayOrder!: number;
    price!: number;
    allowedStorage!: number;
    expand!: false;
    features!: any[];
  }