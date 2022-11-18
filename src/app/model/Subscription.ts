export interface SubscriptionPlanTransactionHistory {
  amount: number;
  amountDue: number;
  cess: number;
  cgst: number;
  discountFor: string;
  discountType: string;
  discountedPrice: number;
  gst: number;
  id: number;
  igst: number;
  invoiceId: string;
  items: items[];
  netamount: number;
  orderAttempts: number;
  orderCreatedAt: Date;
  orderId: string;
  orderStatus: string;
  paymentCreatedAt: Date;
  paymentStatus: string;
  receipt: string;
  sac: number;
  sgst: number;
  userId: number;
  }

  export interface items{
    id: number;
    itemId: number;
    name: string;
    price: number;
    type: string;
    }

    export class FAQ {
      id!: number;
      active!: boolean;
      createdDate!: Date;
      displayOrder!: number;
      question!: string;
      expand!: false;
    }