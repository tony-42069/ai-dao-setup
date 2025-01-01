import { SlackApp } from './SlackApp';
import { MessageBus } from '@agents/shared/communication/messageBus';

export { SlackApp };
export function initializeSlackIntegration(messageBus: MessageBus): SlackApp {
  const token = process.env.SLACK_BOT_TOKEN;
  const signingSecret = process.env.SLACK_SIGNING_SECRET;

  if (!token || !signingSecret) {
    throw new Error('Slack credentials not found in environment variables');
  }

  const slackApp = new SlackApp(token, signingSecret, messageBus);
  return slackApp;
}
