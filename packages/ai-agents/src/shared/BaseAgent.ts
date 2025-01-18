import { Anthropic } from '@anthropic-ai/sdk';
import { Provider, Signer } from 'ethers';
import {
  Agent,
  AgentRole,
  AgentStatus,
  Decision,
  DecisionPriority,
  DecisionStatus,
  ValidationResult,
  ExecutionResult,
  Message,
  MessageHandler,
  MessageBusSubscriber,
  MessageStatus,
  MessagePriority
} from './types';
import { DecisionType, ValidationLevel, ExecutionPriority, MessageType } from './enums';
import { MessageBus } from './MessageBus';

export abstract class BaseAgent implements MessageHandler {
  protected agent: Agent;
  protected anthropic: Anthropic;
  protected provider: Provider;
  protected signer: Signer;
  protected messageBus: MessageBus;

  constructor(
    agent: Agent,
    anthropicApiKey: string,
    provider: Provider,
    signer: Signer
  ) {
    this.agent = agent;
    this.anthropic = new Anthropic({ apiKey: anthropicApiKey });
    this.provider = provider;
    this.signer = signer;
    
    // Initialize message bus
    this.messageBus = MessageBus.getInstance();
    this.messageBus.subscribe({
      id: this.agent.id,
      messageTypes: this.getSupportedMessageTypes(),
      handler: this
    });
  }

  // Core methods to be implemented by specific agents
  abstract makeDecision(context: any): Promise<Decision>;
  abstract getSupportedMessageTypes(): MessageType[];
  
  // MessageHandler implementation
  async handleMessage(message: Message): Promise<void> {
    try {
      switch (message.type) {
        case MessageType.DECISION_REQUEST:
          await this.handleDecisionRequest(message);
          break;
        case MessageType.STATUS_UPDATE:
          await this.handleStatusUpdate(message);
          break;
        case MessageType.ALERT:
          await this.handleAlert(message);
          break;
        default:
          console.warn(`Unhandled message type: ${message.type}`);
      }
    } catch (error) {
      console.error(`Error handling message ${message.id}:`, error);
      throw error;
    }
  }

  // Default message type handlers - can be overridden by specific agents
  protected async handleDecisionRequest(message: Message): Promise<void> {
    const decision = await this.makeDecision(message.content);
    await this.messageBus.publish({
      id: MessageBus.generateMessageId(),
      type: MessageType.DECISION_RESPONSE,
      sender: this.agent.id,
      recipients: [message.sender],
      content: decision,
      timestamp: new Date(),
      priority: message.priority,
      status: MessageStatus.PENDING,
      correlationId: message.id
    });
  }

  protected async handleStatusUpdate(message: Message): Promise<void> {
    // Default implementation - agents can override
    console.log(`Status update received by ${this.agent.id}:`, message.content);
  }

  protected async handleAlert(message: Message): Promise<void> {
    // Default implementation - agents can override
    console.log(`Alert received by ${this.agent.id}:`, message.content);
  }

  // Helper method to send messages
  protected async sendMessage(
    type: MessageType,
    recipients: string[],
    content: any,
    priority: MessagePriority = MessagePriority.MEDIUM,
    correlationId?: string
  ): Promise<void> {
    await this.messageBus.publish({
      id: MessageBus.generateMessageId(),
      type,
      sender: this.agent.id,
      recipients,
      content,
      timestamp: new Date(),
      priority,
      status: MessageStatus.PENDING,
      correlationId
    });
  }

  // Validate a decision based on agent role and type
  async validateDecision(
    decision: Decision,
    level: ValidationLevel = ValidationLevel.STRICT
  ): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic validation
    if (!decision.id || !decision.type || !decision.agentId) {
      errors.push('Missing required decision fields');
    }

    // Role-based validation
    if (!this.canMakeDecision(decision.type)) {
      errors.push(`Agent role ${this.agent.role} cannot make ${decision.type} decisions`);
    }

    // Status validation
    if (this.agent.status !== AgentStatus.ACTIVE) {
      errors.push('Agent is not active');
    }

    // Parameter validation based on decision type
    if (decision.type === DecisionType.FINANCIAL && !decision.parameters.amount) {
      errors.push('Financial decisions require an amount parameter');
    }

    if (decision.type === DecisionType.TECHNICAL && !decision.parameters.technology) {
      errors.push('Technical decisions require a technology parameter');
    }

    // Additional validations based on level
    if (level === ValidationLevel.STRICT) {
      if (!decision.parameters.implementationPlan) {
        errors.push('Strict validation requires an implementation plan');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  // Execute a validated decision
  async executeDecision(decision: Decision): Promise<ExecutionResult> {
    try {
      // Validate before execution
      const validation = await this.validateDecision(decision);
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed: ' + validation.errors?.join(', ')
        };
      }

      // Execute based on decision type
      switch (decision.type) {
        case DecisionType.FINANCIAL:
          return this.executeFinancialDecision(decision);
        case DecisionType.TECHNICAL:
          return this.executeTechnicalDecision(decision);
        case DecisionType.OPERATIONAL:
          return this.executeOperationalDecision(decision);
        case DecisionType.STRATEGIC:
          return this.executeStrategicDecision(decision);
        default:
          throw new Error('Unknown decision type');
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error during execution'
      };
    }
  }

  // Helper methods for decision execution
  protected async executeFinancialDecision(decision: Decision): Promise<ExecutionResult> {
    // Implementation will vary by agent role
    throw new Error('Method not implemented');
  }

  protected async executeTechnicalDecision(decision: Decision): Promise<ExecutionResult> {
    // Implementation will vary by agent role
    throw new Error('Method not implemented');
  }

  protected async executeOperationalDecision(decision: Decision): Promise<ExecutionResult> {
    // Implementation will vary by agent role
    throw new Error('Method not implemented');
  }

  protected async executeStrategicDecision(decision: Decision): Promise<ExecutionResult> {
    // Implementation will vary by agent role
    throw new Error('Method not implemented');
  }

  // Utility methods
  protected canMakeDecision(type: DecisionType): boolean {
    switch (this.agent.role) {
      case AgentRole.CEO:
        return [DecisionType.OPERATIONAL, DecisionType.STRATEGIC].includes(type);
      case AgentRole.CFO:
        return [DecisionType.FINANCIAL, DecisionType.STRATEGIC].includes(type);
      case AgentRole.CTO:
        return [DecisionType.TECHNICAL, DecisionType.STRATEGIC].includes(type);
      default:
        return false;
    }
  }

  protected async getAIResponse(prompt: string): Promise<string> {
    const message = await this.anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });
    return message.content[0].text;
  }

  // Getters
  public getRole(): AgentRole {
    return this.agent.role;
  }

  public getStatus(): AgentStatus {
    return this.agent.status;
  }

  public getCapabilities(): string[] {
    return this.agent.capabilities;
  }
}
