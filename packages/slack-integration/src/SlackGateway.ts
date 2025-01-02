import { App } from '@slack/bolt';
import { MessageBus } from '@ai-dao/agents/shared/communication/messageBus';
import { 
  MessageTypes,
  DecisionRequestMessage, 
  ErrorMessage 
} from '@ai-dao/agents/shared/communication/protocolTypes';
import { validateSlackMessage } from './validation';
import { log } from '@ai-dao/agents/shared/utils';

export class SlackGateway {
  private app: App;
  private messageBus: MessageBus;
  private failedMessages: Array<{
    sender: string;
    content: string;
    payload: any;
    timestamp: number;
    attempts: number;
  }> = [];

  constructor(token: string, signingSecret: string, messageBus: MessageBus) {
    this.app = new App({
      token,
      signingSecret,
    });
    this.messageBus = messageBus;
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    // Handle incoming Slack messages
    this.app.message(async ({ message, say }) => {
      try {
        const text = 'text' in message ? message.text : '';
        const userId = 'user' in message ? message.user : '';

        // Validate Slack message
        const validation = validateSlackMessage(text, userId);
        if (!validation.valid) {
          await say(`Error: ${validation.error}`);
          return;
        }

        // Convert Slack message to DAO decision request
        const decisionRequest: DecisionRequestMessage = {
          type: MessageTypes.DECISION_REQUEST,
          sender: `slack:${userId}`,
          timestamp: Date.now(),
          payload: {
            decisionId: `slack-${Date.now()}`,
            context: {
              text,
              userId,
              channel: 'channel' in message ? message.channel : undefined
            }
          }
        };

        // Send decision request to message bus
        log(`Sending decision request to message bus: ${JSON.stringify(decisionRequest)}`);
        await this.messageBus.sendMessage(decisionRequest);
        await say('Your request has been received and is being processed.');
        log('Decision request successfully sent to message bus');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        log(`Slack gateway error: ${errorMessage}`, 'error');

        // Send error message to message bus
        const errorMsg: ErrorMessage = {
          type: MessageTypes.ERROR,
          sender: 'slack-gateway',
          timestamp: Date.now(),
          payload: {
            error: errorMessage,
            stack: error instanceof Error ? error.stack : undefined
          }
        };
        await this.messageBus.sendMessage(errorMsg);
        await say('An error occurred while processing your request. Please try again later.');
      }
    });

    // Handle responses from agents with retry mechanism
    this.messageBus.on('slack-response', async (response) => {
      const maxRetries = 3;
      let attempt = 0;
      
      const sendMessageWithRetry = async (): Promise<void> => {
        try {
          if (response.sender && response.content) {
            await this.app.client.chat.postMessage({
              channel: response.payload?.context?.channel || 'general',
              text: `${response.sender}: ${response.content}`
            });
            log(`Successfully sent Slack message to ${response.payload?.context?.channel || 'general'}`);
          }
        } catch (error) {
          attempt++;
          if (attempt < maxRetries) {
            const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
            log(`Retry ${attempt}/${maxRetries} in ${delay}ms for Slack message: ${error}`, 'warn');
            await new Promise(resolve => setTimeout(resolve, delay));
            return sendMessageWithRetry();
          } else {
            log(`Failed to send Slack message after ${maxRetries} attempts: ${error}`, 'error');
            
            // Fallback: Store failed message for later processing
            this.queueFailedMessage(response);
          }
        }
      };

      await sendMessageWithRetry();
    });

    // Initialize message queue
    this.failedMessages = [];
    setInterval(this.processFailedMessages.bind(this), 60000); // Process failed messages every minute
  }

  private queueFailedMessage(response: any): void {
    this.failedMessages.push({
      ...response,
      timestamp: Date.now(),
      attempts: 0
    });
    log(`Queued failed message for later processing. Queue size: ${this.failedMessages.length}`);
  }

  private async processFailedMessages(): Promise<void> {
    if (this.failedMessages.length === 0) return;

    log(`Processing ${this.failedMessages.length} failed messages...`);
    const successfulMessages: Array<{
      sender: string;
      content: string;
      payload: any;
      timestamp: number;
      attempts: number;
    }> = [];
    
    for (const message of this.failedMessages) {
      try {
        await this.app.client.chat.postMessage({
          channel: message.payload?.context?.channel || 'general',
          text: `${message.sender}: ${message.content}`
        });
        successfulMessages.push(message);
        log(`Successfully sent queued message to ${message.payload?.context?.channel || 'general'}`);
      } catch (error) {
        message.attempts++;
        if (message.attempts >= 3) {
          log(`Permanently failed to send queued message after 3 attempts: ${error}`, 'error');
          successfulMessages.push(message); // Remove from queue even if failed
        } else {
          log(`Failed to send queued message (attempt ${message.attempts}): ${error}`, 'warn');
        }
      }
    }

    // Remove successfully sent messages from queue
    this.failedMessages = this.failedMessages.filter(
      msg => !successfulMessages.includes(msg)
    );
  }

  public async start(port: number) {
    await this.app.start(port);
    log(`Slack gateway running on port ${port}`);
  }
}
