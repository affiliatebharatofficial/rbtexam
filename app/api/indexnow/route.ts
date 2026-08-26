import { NextResponse } from 'next/server';
import {
  getIndexNowConfig,
  getAllSiteUrls,
  submitToIndexNow,
  submitAllSitemapUrls,
  getIndexNowSubmissionLogs,
} from '@/lib/indexnow-engine';

export async function GET() {
  try {
    const config = getIndexNowConfig();
    const allUrls = getAllSiteUrls();
    const recentLogs = getIndexNowSubmissionLogs();

    return NextResponse.json({
      success: true,
      service: 'Bing IndexNow Engine',
      config: {
        host: config.host,
        key: config.key,
        keyLocation: config.keyLocation,
        enabled: config.enabled,
        autoSubmitOnPublish: config.autoSubmitOnPublish,
        primaryEndpoint: config.primaryEndpoint,
        fallbackEndpoints: config.fallbackEndpoints,
      },
      stats: {
        totalDiscoveredUrls: allUrls.length,
        totalSubmissionBatches: recentLogs.length,
        lastSubmission: recentLogs[0] || null,
      },
      verifiedKeyFile: `/${config.key}.txt`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to retrieve IndexNow status',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: any = await request.json().catch(() => ({}));
    const { urls, url, submitAll, customHost, customKey } = body;

    if (submitAll === true) {
      const result = await submitAllSitemapUrls('Admin API Request');
      return NextResponse.json(result, {
        status: result.success ? 200 : (result.status >= 400 ? result.status : 500),
      });
    }

    const targetUrls = urls || (url ? [url] : []);

    if (!Array.isArray(targetUrls) || targetUrls.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide an array of "urls" or set "submitAll": true in the request body.',
        },
        { status: 400 }
      );
    }

    const result = await submitToIndexNow(
      targetUrls,
      'API Request',
      customHost,
      customKey
    );

    return NextResponse.json(result, {
      status: result.success ? 200 : (result.status >= 400 ? result.status : 500),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal Server Error while submitting to IndexNow',
      },
      { status: 500 }
    );
  }
}
