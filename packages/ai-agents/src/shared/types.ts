import { DecisionType, MessageType } from './enums';

export interface Message {
  id: string;
  type: MessageType;
  sender: string;
  recipients: string[];
  content: any;
  timestamp: Date;
  priority: MessagePriority;
  status: MessageStatus;
  correlationId?: string;
}

export enum MessagePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum MessageStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED'
}

export interface MessageHandler {
  handleMessage(message: Message): Promise<void>;
}

export interface MessageBusSubscriber {
  id: string;
  messageTypes: MessageType[];
  handler: MessageHandler;
}

export interface Decision {
  id: string;
  type: DecisionType;
  parameters: {
    amount?: number;
    technology?: string;
    implementationPlan?: string;
    resources?: string[];
  };
  priority: DecisionPriority;
  status: DecisionStatus;
  timestamp: Date;
  agentId: string;
}

export enum DecisionPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum DecisionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXECUTED = 'EXECUTED',
  FAILED = 'FAILED'
}

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  address: string;
  capabilities: string[];
  status: AgentStatus;
}

export enum AgentRole {
  CEO = 'CEO',
  CFO = 'CFO',
  CTO = 'CTO'
}

export enum AgentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PAUSED = 'PAUSED'
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface ExecutionResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
  details?: Record<string, any>;
}
