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
    
    // Add middleware to verify requests
    this.app.use(async ({ body, context, next, ...args }) => {
      const headers = args['headers'] as Record<string, string>;
      try {
        // Verify request timestamp
        const timestamp = Number(headers['x-slack-request-timestamp']);
        if (isNaN(timestamp) || Date.now() / 1000 - timestamp > 300) {
          throw new Error('Request too old');
        }

        // Verify request signature
        const signature = headers['x-slack-signature'] as string;
        if (!signature) {
          throw new Error('Missing request signature');
        }

        await next();
      } catch (error) {
        log(`Request verification failed: ${error}`, 'error');
        throw error;
      }
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    // Handle governance commands
    this.app.command('/governance', async ({ command, ack, say }) => {
      await ack();
      
      try {
        const [action, ...params] = command.text.split(' ');
        
        switch (action) {
          case 'proposals':
            await this.handleProposalsCommand(say);
            break;
          case 'vote':
            await this.handleVoteCommand(params, say);
            break;
          case 'status':
            await this.handleStatusCommand(say);
            break;
          default:
            await say(`Unknown governance command: ${action}`);
        }
      } catch (error) {
        log(`Error processing governance command: ${error}`, 'error');
        await say('An error occurred while processing your governance command. Please try again.');
      }
    });

    // Handle general messages
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

  private async handleProposalsCommand(say: any) {
    const proposals = await this.messageBus.sendMessage({
      type: 'GET_PROPOSALS',
      sender: 'slack',
      timestamp: Date.now(),
      payload: {}
    });
    const formattedProposals = proposals.map(p => `• ${p.title} (ID: ${p.id})`).join('\n');
    await say(`Current proposals:\n${formattedProposals}`);
  }

  private async handleVoteCommand(params: string[], say: any) {
    if (params.length < 2) {
      await say('Usage: /governance vote <proposal_id> <choice>');
      return;
    }
    
    const [proposalId, choice] = params;
    await this.messageBus.sendVote(proposalId, choice);
    await say(`Vote submitted for proposal ${proposalId} with choice ${choice}`);
  }

  private async handleStatusCommand(say: any) {
    const status = await this.messageBus.requestGovernanceStatus();
    await say(`Current governance status:\n• Proposals: ${status.proposalCount}\n• Quorum: ${status.quorumReached ? 'Reached' : 'Not reached'}`);
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
