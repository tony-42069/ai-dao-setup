import { App } from '@slack/bolt';
import { CEOAgent } from '../agents/ceo/CEOAgent';
import { CFOAgent } from '../agents/cfo/CFOAgent';
import { CTOAgent } from '../agents/cto/CTOAgent';
import { log } from '../agents/shared/utils';

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;

if (!SLACK_BOT_TOKEN || !SLACK_SIGNING_SECRET) {
  throw new Error('Slack credentials are required');
}

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET
});

// Initialize AI agents
const ceo = new CEOAgent({
  role: 'CEO',
  model: 'gpt-4',
  capabilities: ['decision-making', 'strategy']
});
const cfo = new CFOAgent({
  role: 'CFO',
  model: 'gpt-4',
  capabilities: ['financial-analysis', 'budgeting'],
  treasuryAddress: '0x123...',
  financialReportingInterval: 86400 // daily
});

const cto = new CTOAgent({
  role: 'CTO',
  model: 'gpt-4',
  capabilities: ['technical-strategy', 'architecture'],
  techStack: ['ethereum', 'ipfs', 'react'],
  monitoringEndpoints: ['https://monitor.example.com'],
  securityLevel: 'high'
});

// Route messages to appropriate agent
app.message(async ({ message, say }) => {
  try {
    const text = (message as any).text;
    if (!text) return;

    // Basic command routing
    if (text.startsWith('/ceo')) {
      const response = await ceo.handleMessage(text);
      await say(response);
    } else if (text.startsWith('/cfo')) {
      const response = await cfo.handleMessage(text);
      await say(response);
    } else if (text.startsWith('/cto')) {
      const response = await cto.handleMessage(text);
      await say(response);
    } else {
      await say('Please specify which agent you want to talk to (/ceo, /cfo, /cto)');
    }
  } catch (error) {
    log(`Error handling Slack message: ${error}`, 'error');
    await say('Oops! Something went wrong. Our engineers have been notified.');
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  log('⚡️ Slack bot is running!');
})();
