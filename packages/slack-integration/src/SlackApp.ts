import { App } from '@slack/bolt';
import { MessageBus } from '@ai-dao/agents/shared/communication/messageBus';
import { MessageTypes } from '@ai-dao/agents/shared/communication/protocolTypes';
import { 
  SlackDecisionRequest,
  SlackResponseMessage,
  SlackErrorMessage,
  SlackMessageContextSchema
} from './slackMessageTypes';
import { log } from '@ai-dao/agents/shared/utils';

export class SlackApp {
  private app: App;
  private messageBus: MessageBus;
  private activeListeners: Map<string, { timeout: NodeJS.Timeout, startTime: number }> = new Map();
  private maxListenerDuration = 30000; // 30 seconds

  constructor(token: string, signingSecret: string, messageBus: MessageBus) {
    this.app = new App({
      token,
      signingSecret,
    });
    this.messageBus = messageBus;
    
    // Add middleware to verify requests
    this.app.use(async ({ next, ...args }) => {
      const headers = (args as any).headers as Record<string, string>;
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
        // Type guard for Slack message event
        const isSlackMessage = (
          m: unknown
        ): m is { text: string; channel: string; user: string; ts: string } => {
          return (
            typeof m === 'object' &&
            m !== null &&
            'text' in m &&
            'channel' in m &&
            'user' in m &&
            'ts' in m
          );
        };

        if (!isSlackMessage(message)) {
          throw new Error('Invalid Slack message format');
        }

        const { text, channel, user, ts } = message;
        
        if (text) {
          // Create and validate decision request message
          const decisionRequest = SlackMessageContextSchema.parse({
            text,
            channel,
            userId: user,
            timestamp: ts
          });

          const decisionRequestMessage: SlackDecisionRequest = {
            type: MessageTypes.DECISION_REQUEST,
            sender: `slack:${channel}`,
            timestamp: Date.now(),
            payload: {
              decisionId: `slack-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              context: decisionRequest
            }
          };

          // Send message to bus
          await this.messageBus.sendMessage(decisionRequest);
          log(`Sent Slack message to message bus: ${text}`);
          
          // Wait for response
          const response = await this.waitForResponse(channel);
          // Validate and format response
          const responseMessage = typeof response === 'string' ? response : JSON.stringify(response);
          await say(responseMessage);
        }
      } catch (error) {
        log(`Error processing Slack message: ${error}`, 'error');
        await say('An error occurred while processing your message. Please try again.');
      }
    });
  }

  private async handleProposalsCommand(say: any) {
    try {
      const response = await this.messageBus.sendMessage<{ proposals: Array<{ title: string; id: string }> }>({
        type: 'GET_PROPOSALS',
        sender: 'slack',
        timestamp: Date.now(),
        payload: {}
      });
      
      const formattedProposals = response?.proposals?.map(p => `• ${p.title} (ID: ${p.id})`).join('\n') || 'No proposals found';
      await say(`Current proposals:\n${formattedProposals}`);
    } catch (error) {
      log(`Error fetching proposals: ${error}`, 'error');
      await say('An error occurred while fetching proposals. Please try again.');
    }
  }

  private async handleVoteCommand(params: string[], say: any) {
    if (params.length < 2) {
      await say('Usage: /governance vote <proposal_id> <choice>');
      return;
    }
    
    const [proposalId, choice] = params;
    try {
      await this.messageBus.sendMessage({
        type: 'SEND_VOTE',
        sender: 'slack',
        timestamp: Date.now(),
        payload: {
          proposalId,
          choice
        }
      });
      await say(`Vote submitted for proposal ${proposalId} with choice ${choice}`);
    } catch (error) {
      log(`Error submitting vote: ${error}`, 'error');
      await say('An error occurred while submitting your vote. Please try again.');
    }
  }

  private async handleStatusCommand(say: any) {
    try {
      const status = await this.messageBus.sendMessage<{ proposalCount: number; quorumReached: boolean }>({
        type: 'GET_GOVERNANCE_STATUS',
        sender: 'slack',
        timestamp: Date.now(),
        payload: {}
      });
      
      await say(`Current governance status:\n• Proposals: ${status?.proposalCount ?? 0}\n• Quorum: ${status?.quorumReached ? 'Reached' : 'Not reached'}`);
    } catch (error) {
      log(`Error fetching governance status: ${error}`, 'error');
      await say('An error occurred while fetching governance status. Please try again.');
    }
  }

  private async waitForResponse(channel: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const handler = (message: any) => {
        if (message.sender === `slack:${channel}`) {
          clearTimeout(timeout);
          this.activeListeners.delete(channel);
          const processingTime = Date.now() - startTime;
          log(`Message processed in ${processingTime}ms. Memory usage: ${JSON.stringify(process.memoryUsage())}`);
          resolve(message.payload.context.text);
        }
      };

      const timeout = setTimeout(() => {
        this.messageBus.off('message', handler);
        this.activeListeners.delete(channel);
        const memoryUsage = process.memoryUsage();
        log(`Listener timeout for channel ${channel}. Memory usage: ${JSON.stringify(memoryUsage)}`, 'warn');
        reject(new Error('Response timeout'));
      }, this.maxListenerDuration);

      this.activeListeners.set(channel, { timeout, startTime: Date.now() });
      this.messageBus.on('message', handler);
    });
  }

  private logMemoryUsage() {
    const memory = process.memoryUsage();
    log(`Memory usage - RSS: ${memory.rss} bytes, Heap: ${memory.heapUsed}/${memory.heapTotal} bytes`);
  }

  public async start(port: number) {
    await this.app.start(port);
    log(`Slack app is running on port ${port}`);
    
    // Start periodic memory monitoring
    setInterval(() => this.logMemoryUsage(), 60000); // Log every minute
    
    // Cleanup any stale listeners
    setInterval(() => {
      this.activeListeners.forEach((listener, channel) => {
        if (Date.now() - listener.startTime > this.maxListenerDuration) {
          log(`Cleaning up stale listener for channel ${channel}`, 'warn');
          clearTimeout(listener.timeout);
          this.activeListeners.delete(channel);
        }
      });
    }, 30000); // Check every 30 seconds
  }
}
