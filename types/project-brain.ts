// Master Project Brain — Type Definitions

export type ImplementationState = 'planned' | 'in_progress' | 'completed' | 'testing' | 'production' | 'deprecated';

export type ComponentOwner = 'Core Team' | 'AI Team' | 'SEO Team' | 'Security Team' | 'DevOps Team';

export interface FeatureRecord {
  id: string;
  name: string;
  description: string;
  owner: ComponentOwner;
  version: string;
  status: ImplementationState;
  dependencies: string[];
  databaseTables: string[];
  apiEndpoints: string[];
  routes: string[];
  documentationPath: string;
}

export interface APIRecord {
  id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  authentication: 'none' | 'user' | 'admin' | 'api_key';
  rateLimit: string;
  consumerModules: string[];
  documentationPath: string;
}

export interface DatabaseTableRecord {
  id: string;
  tableName: string;
  schema: string;
  description: string;
  columnCount: number;
  hasRLS: boolean;
  hasIndexes: boolean;
  relatedTables: string[];
}

export interface EngineDependencyNode {
  engineName: string;
  fileLocation: string;
  dependsOn: string[];
  consumedBy: string[];
}

export interface ProjectBrainOverview {
  totalFeatures: number;
  totalEngines: number;
  totalAPIRoutes: number;
  totalDatabaseTables: number;
  totalDocsFiles: number;
  implementationCompletionPercentage: number;
  systemHealthScore: number;
  lastBrainSyncAt: string;
}
