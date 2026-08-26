// Bing & Multi-Search-Engine IndexNow - Type Definitions

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation?: string;
  urlList: string[];
}

export interface IndexNowSubmissionResult {
  success: boolean;
  status: number;
  submittedCount: number;
  urls: string[];
  message: string;
  timestamp: string;
  error?: string;
  endpoint?: string;
}

export interface IndexNowConfig {
  key: string;
  host: string;
  enabled: boolean;
  autoSubmitOnPublish: boolean;
  keyLocation: string;
  primaryEndpoint: string;
  fallbackEndpoints: string[];
}

export interface IndexNowLog {
  id: string;
  timestamp: string;
  urlsCount: number;
  sampleUrls: string[];
  status: number;
  success: boolean;
  responseText?: string;
  triggeredBy: string;
  endpoint: string;
}
