import { SlackApp } from './SlackApp';
import { AIAgent } from '@agents/AIAgent';

export function initializeSlackIntegration(agents: AIAgent[]): SlackApp {
  const token = process.env.SLACK_BOT_TOKEN;
  const signingSecret = process.env.SLACK_SIGNING_SECRET;

  if (!token || !signingSecret) {
    throw new Error('Slack credentials not found in environment variables');
  }

  const slackApp = new SlackApp(token, signingSecret, agents);
  return slackApp;
}
