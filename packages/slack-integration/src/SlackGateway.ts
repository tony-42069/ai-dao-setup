import { App } from '@slack/bolt';
import { MessageBus } from '@agents/shared/communication/messageBus';
import { 
  MessageTypes,
  DecisionRequestMessage, 
  ErrorMessage 
} from '@agents/shared/communication/protocolTypes';
import { validateSlackMessage } from '@slack-integration/validation';
import { log } from '@agents/shared/utils';

export class SlackGateway {
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

    // Handle responses from agents
    this.messageBus.on('slack-response', async (response) => {
      try {
        if (response.sender && response.content) {
          await this.app.client.chat.postMessage({
            channel: response.payload?.context?.channel || 'general',
            text: `${response.sender}: ${response.content}`
          });
        }
      } catch (error) {
        log(`Error posting Slack response: ${error}`, 'error');
      }
    });
  }

  public async start(port: number) {
    await this.app.start(port);
    log(`Slack gateway running on port ${port}`);
  }
}
