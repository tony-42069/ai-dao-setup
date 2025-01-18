import { Message, MessageBusSubscriber, MessageHandler, MessageStatus } from './types';
import { MessageType } from './enums';
import EventEmitter from 'events';

export class MessageBus {
  private static instance: MessageBus;
  private subscribers: Map<string, MessageBusSubscriber>;
  private messageHistory: Message[];
  private eventEmitter: EventEmitter;
  private maxHistorySize: number;

  private constructor() {
    this.subscribers = new Map();
    this.messageHistory = [];
    this.eventEmitter = new EventEmitter();
    this.maxHistorySize = 1000; // Configurable message history size
  }

  public static getInstance(): MessageBus {
    if (!MessageBus.instance) {
      MessageBus.instance = new MessageBus();
    }
    return MessageBus.instance;
  }

  public subscribe(subscriber: MessageBusSubscriber): void {
    this.subscribers.set(subscriber.id, subscriber);
    
    // Subscribe to specific message types
    subscriber.messageTypes.forEach(type => {
      this.eventEmitter.on(type, async (message: Message) => {
        try {
          await subscriber.handler.handleMessage(message);
          this.updateMessageStatus(message.id, MessageStatus.PROCESSED);
        } catch (error) {
          this.updateMessageStatus(message.id, MessageStatus.FAILED);
          console.error(`Error processing message ${message.id}:`, error);
        }
      });
    });
  }

  public unsubscribe(subscriberId: string): void {
    const subscriber = this.subscribers.get(subscriberId);
    if (subscriber) {
      subscriber.messageTypes.forEach(type => {
        this.eventEmitter.removeAllListeners(type);
      });
      this.subscribers.delete(subscriberId);
    }
  }

  public async publish(message: Message): Promise<void> {
    // Add to history
    this.addToHistory(message);

    // Set initial status
    message.status = MessageStatus.PENDING;

    // Filter subscribers based on message type and recipients
    const relevantSubscribers = Array.from(this.subscribers.values())
      .filter(sub => 
        sub.messageTypes.includes(message.type) && 
        (message.recipients.length === 0 || message.recipients.includes(sub.id))
      );

    // Emit to relevant subscribers
    relevantSubscribers.forEach(subscriber => {
      this.eventEmitter.emit(message.type, message);
    });

    // Update status if there were no subscribers
    if (relevantSubscribers.length === 0) {
      this.updateMessageStatus(message.id, MessageStatus.DELIVERED);
    }
  }

  public getMessageHistory(
    filter?: {
      type?: MessageType;
      sender?: string;
      status?: MessageStatus;
      fromTimestamp?: Date;
    }
  ): Message[] {
    let filteredHistory = this.messageHistory;

    if (filter) {
      const { type, sender, status, fromTimestamp } = filter;
      
      if (type !== undefined) {
        filteredHistory = filteredHistory.filter(m => m.type === type);
      }
      if (sender !== undefined) {
        filteredHistory = filteredHistory.filter(m => m.sender === sender);
      }
      if (status !== undefined) {
        filteredHistory = filteredHistory.filter(m => m.status === status);
      }
      if (fromTimestamp !== undefined) {
        filteredHistory = filteredHistory.filter(m => m.timestamp >= fromTimestamp);
      }
    }

    return filteredHistory;
  }

  public clearHistory(): void {
    this.messageHistory = [];
  }

  private addToHistory(message: Message): void {
    this.messageHistory.push(message);
    
    // Maintain history size limit
    if (this.messageHistory.length > this.maxHistorySize) {
      this.messageHistory = this.messageHistory.slice(-this.maxHistorySize);
    }
  }

  private updateMessageStatus(messageId: string, status: MessageStatus): void {
    const message = this.messageHistory.find(m => m.id === messageId);
    if (message) {
      message.status = status;
    }
  }

  // Utility method to generate unique message IDs
  public static generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
