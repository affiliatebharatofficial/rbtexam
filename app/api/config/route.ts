import { NextRequest, NextResponse } from 'next/server';
import { getPlatformConfig, isFreeAccessActive, isMonetizationEnabled, isPricingSectionVisible } from '@/lib/platform-config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const config = getPlatformConfig();

    return NextResponse.json({
      success: true,
      freeAccessMode: isFreeAccessActive(),
      monetizationEnabled: isMonetizationEnabled(),
      showPricingSection: isPricingSectionVisible(),
      freeAccessBannerText: config.freeAccessBannerText || '🎉 100% Free Complete Access — All Questions, Mock Exams, and Explanations are currently unlocked for everyone!',
      freeAccessBadgeText: config.freeAccessBadgeText || '100% Free Open Access Mode Active',
      pricingPageCtaText: config.pricingPageCtaText || 'Start Free Practice',
      brandName: config.brandName,
      allowPublicRegistration: config.allowPublicRegistration,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve public configuration', message: error.message },
      { status: 500 }
    );
  }
}
