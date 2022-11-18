import { BatchVO } from './BatchVO';

export interface PricingPlanVO {
  idPricingPlan: number;
  idCourse: number;
  pricingPlanName: string;
  isPlanActive: string;
  price: number;
  discountPrice: number;
  discountOffer: number;
  discountOfferName: string;
  discountValidTill: Date;
  discountValidStr: string;
  planDescription: string;
  batchList: BatchVO[];
  planLabel:string;
}

export interface PricingPlanRes {
  body: PricingPlanVO[];
}