export enum MessageType {
  DECISION = 'DECISION',
  DECISION_REQUEST = 'DECISION_REQUEST',
  DECISION_RESPONSE = 'DECISION_RESPONSE',
  STATUS_UPDATE = 'STATUS_UPDATE',
  ALERT = 'ALERT',
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
  EVENT = 'EVENT',
  ERROR = 'ERROR',
  INFO = 'INFO'
}

export enum DecisionType {
  FINANCIAL = 'FINANCIAL',     // Financial decisions (investments, expenditures)
  TECHNICAL = 'TECHNICAL',     // Technical decisions (technology stack, architecture)
  OPERATIONAL = 'OPERATIONAL', // Day-to-day operations
  STRATEGIC = 'STRATEGIC'      // Long-term strategic decisions
}

export enum ValidationLevel {
  STRICT = 'STRICT',
  MODERATE = 'MODERATE',
  LENIENT = 'LENIENT'
}

export enum ExecutionPriority {
  IMMEDIATE = 'IMMEDIATE',
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
  LOW = 'LOW'
}

export enum ResourceType {
  FINANCIAL = 'FINANCIAL',
  TECHNICAL = 'TECHNICAL',
  HUMAN = 'HUMAN',
  INFRASTRUCTURE = 'INFRASTRUCTURE'
}
