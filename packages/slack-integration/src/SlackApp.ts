import { App } from '@slack/bolt';
import { MessageBus } from '@agents/shared/communication/messageBus';
import { MessageTypes, DecisionRequestMessage } from '@agents/shared/communication/protocolTypes';
import { log } from '@ai-dao/agents/shared/utils';

export class SlackApp {
  private app: App;
  private messageBus: MessageBus;

  constructor(token: string, signingSecret: string, messageBus: MessageBus) {
    this.app = new App({
      token,
      signingSecret,
    });
    this.messageBus = messageBus;
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.app.message(async ({ message, say }) => {
      try {
        const text = 'text' in message ? message.text : '';
        const channel = 'channel' in message ? message.channel : 'general';
        
        if (text) {
          // Create decision request message
          const decisionRequest: DecisionRequestMessage = {
            type: MessageTypes.DECISION_REQUEST,
            sender: `slack:${channel}`,
            timestamp: Date.now(),
            payload: {
              decisionId: `slack-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              context: {
                text,
                channel
              }
            }
          };

          // Send message to bus
          await this.messageBus.sendMessage(decisionRequest);
          log(`Sent Slack message to message bus: ${text}`);
          
          // Wait for response
          const response = await this.waitForResponse(channel);
          await say(response);
        }
      } catch (error) {
        log(`Error processing Slack message: ${error}`, 'error');
        await say('An error occurred while processing your message. Please try again.');
      }
    });
  }

  private async waitForResponse(channel: string): Promise<string> {
    return new Promise((resolve) => {
      const handler = (message: any) => {
        if (message.sender === `slack:${channel}`) {
          resolve(message.payload.context.text);
        }
      };
      
      this.messageBus.on('message', handler);
    });
  }

  public async start(port: number) {
    await this.app.start(port);
    log(`Slack app is running on port ${port}`);
  }
}
