export type BACBDomainId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface BACBTaskItem {
  id: string; // e.g. "A-01", "C-03"
  domainId: BACBDomainId;
  title: string;
  description: string;
  keyConcepts: string[];
  examWeightPercentage: number;
}

export interface BACBDomain {
  id: BACBDomainId;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  questionCountApprox: number;
  weightPercentage: number;
  items: BACBTaskItem[];
}
