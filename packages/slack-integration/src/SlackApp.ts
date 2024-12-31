import { App } from '@slack/bolt';
import { AIAgent } from '@agents/AIAgent';

export class SlackApp {
  private app: App;
  private agents: AIAgent[];

  constructor(token: string, signingSecret: string, agents: AIAgent[]) {
    this.app = new App({
      token,
      signingSecret,
    });
    this.agents = agents;
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.app.message(async ({ message, say }) => {
      // Route message to appropriate AI agent
      const text = 'text' in message ? message.text : '';
      const agent = this.findAgentForMessage(message);
      if (agent && text) {
        const response = await agent.processMessage(text);
        await say(response);
      }
    });
  }

  private findAgentForMessage(message: any): AIAgent | undefined {
    // Implement logic to determine which agent should handle the message
    return this.agents[0]; // Temporary - will implement proper routing
  }

  public async start(port: number) {
    await this.app.start(port);
    console.log(`Slack app is running on port ${port}`);
  }
}
