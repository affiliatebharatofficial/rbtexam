export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  badge?: string;
  features: string[];
  isPopular?: boolean;
  isActive: boolean;
  buttonText: string;
  targetAudience?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscriptionPlanInput {
  name: string;
  slug?: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  badge?: string;
  features: string[];
  isPopular?: boolean;
  isActive?: boolean;
  buttonText?: string;
  targetAudience?: string;
}
