import { BACBDomainId } from './bacb';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  bacbRef?: string;
  suggestedFollowups?: string[];
}

export interface Scenario {
  id: string;
  title: string;
  domainId: BACBDomainId;
  taskItemId: string;
  clientAge: number;
  setting: string; // e.g. "Home Clinic", "School Classroom"
  targetBehavior: string;
  initialPrompt: string;
  learningGoal: string;
}

export interface ScenarioStep {
  stepNumber: number;
  situation: string;
  options: {
    id: string;
    actionText: string;
    isEthical: boolean;
    bacbRule: string;
  }[];
}
