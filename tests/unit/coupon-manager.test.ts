import { describe, it, expect } from 'vitest';
import {
  getAllCoupons,
  createCoupon,
  toggleCouponStatus,
  deleteCoupon,
  validateAndApplyCoupon,
} from '@/lib/coupon-engine';

describe('Coupon Management & Validation Engine', () => {
  it('should list active default coupons', () => {
    const coupons = getAllCoupons();
    expect(coupons.length).toBeGreaterThanOrEqual(3);
  });

  it('should create and validate a new promo coupon', () => {
    const created = createCoupon({
      code: 'TESTPROMO50',
      discountType: 'percentage',
      discountValue: 50,
      applicableTiers: ['pro', 'team'],
      maxUses: 100,
      expiresAt: '2028-12-31T23:59:59Z',
    });

    expect(created.code).toBe('TESTPROMO50');
    expect(created.isActive).toBe(true);

    const result = validateAndApplyCoupon('TESTPROMO50', 100, 'pro');
    expect(result.valid).toBe(true);
    expect(result.discountedPriceUSD).toBe(50);
  });

  it('should disable and enable a coupon code', () => {
    const coupons = getAllCoupons();
    const target = coupons[0];

    toggleCouponStatus(target.id);
    const disabledResult = validateAndApplyCoupon(target.code, 100, 'pro');
    expect(disabledResult.valid).toBe(false);

    toggleCouponStatus(target.id);
    const reenabledResult = validateAndApplyCoupon(target.code, 100, 'pro');
    expect(reenabledResult.valid).toBe(true);
  });

  it('should delete a coupon code', () => {
    const created = createCoupon({
      code: 'TEMPDELETE',
      discountType: 'fixed',
      discountValue: 10,
      applicableTiers: ['pro'],
      maxUses: 10,
      expiresAt: '2028-12-31T23:59:59Z',
    });

    const deleted = deleteCoupon(created.id);
    expect(deleted).toBe(true);

    const check = getAllCoupons().find((c) => c.id === created.id);
    expect(check).toBeUndefined();
  });
});
