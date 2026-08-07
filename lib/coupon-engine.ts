import { Coupon, PlanTier } from '@/types/subscription';

export const PROMO_COUPONS: Coupon[] = [
  {
    id: 'c-100',
    code: 'PASS100',
    discountType: 'percentage',
    discountValue: 100, // 100% OFF Free VIP Access
    applicableTiers: ['pro', 'team', 'lifetime'],
    maxUses: 1000,
    currentUses: 42,
    expiresAt: '2027-12-31T23:59:59Z',
    isActive: true,
  },
  {
    id: 'c-20',
    code: 'SUMMER20',
    discountType: 'percentage',
    discountValue: 20, // 20% OFF
    applicableTiers: ['pro', 'team'],
    maxUses: 500,
    currentUses: 120,
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true,
  },
  {
    id: 'c-fixed',
    code: 'SAVE10',
    discountType: 'fixed',
    discountValue: 10, // $10 OFF
    applicableTiers: ['pro'],
    maxUses: 200,
    currentUses: 15,
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true,
  },
];

export function getAllCoupons(): Coupon[] {
  return [...PROMO_COUPONS];
}

export function createCoupon(data: Omit<Coupon, 'id' | 'currentUses' | 'isActive'>): Coupon {
  const newCoupon: Coupon = {
    ...data,
    id: `c-${Date.now()}`,
    code: data.code.trim().toUpperCase(),
    currentUses: 0,
    isActive: true,
  };
  PROMO_COUPONS.unshift(newCoupon);
  return newCoupon;
}

export function toggleCouponStatus(id: string): boolean {
  const coupon = PROMO_COUPONS.find((c) => c.id === id);
  if (coupon) {
    coupon.isActive = !coupon.isActive;
    return true;
  }
  return false;
}

export function deleteCoupon(id: string): boolean {
  const idx = PROMO_COUPONS.findIndex((c) => c.id === id);
  if (idx !== -1) {
    PROMO_COUPONS.splice(idx, 1);
    return true;
  }
  return false;
}

/**
 * Validates promo coupon code and calculates discounted final price
 */
export function validateAndApplyCoupon(
  code: string,
  originalPriceUSD: number,
  tier: PlanTier
): { valid: boolean; discountedPriceUSD: number; discountAmountUSD: number; message: string } {
  const coupon = PROMO_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());

  if (!coupon || !coupon.isActive) {
    return { valid: false, discountedPriceUSD: originalPriceUSD, discountAmountUSD: 0, message: 'Invalid or expired coupon code.' };
  }

  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, discountedPriceUSD: originalPriceUSD, discountAmountUSD: 0, message: 'Coupon code has expired.' };
  }

  if (coupon.currentUses >= coupon.maxUses) {
    return { valid: false, discountedPriceUSD: originalPriceUSD, discountAmountUSD: 0, message: 'Coupon maximum redemptions reached.' };
  }

  if (!coupon.applicableTiers.includes(tier)) {
    return { valid: false, discountedPriceUSD: originalPriceUSD, discountAmountUSD: 0, message: `Coupon is not applicable for ${tier.toUpperCase()} plan.` };
  }

  let discountAmountUSD = 0;
  if (coupon.discountType === 'percentage') {
    discountAmountUSD = (originalPriceUSD * coupon.discountValue) / 100;
  } else {
    discountAmountUSD = coupon.discountValue;
  }

  const discountedPriceUSD = Math.max(0, originalPriceUSD - discountAmountUSD);

  return {
    valid: true,
    discountedPriceUSD,
    discountAmountUSD,
    message: `Coupon Applied: ${coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `$${coupon.discountValue} OFF`}`,
  };
}
