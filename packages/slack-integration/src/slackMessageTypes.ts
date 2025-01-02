import { z } from 'zod';
import { MessageTypes } from '@ai-dao/agents/shared/communication/protocolTypes';

// Schema for Slack message context
export const SlackMessageContextSchema = z.object({
  text: z.string(),
  channel: z.string(),
  userId: z.string(),
  timestamp: z.string(),
  thread_ts: z.string().optional(),
});

export type SlackMessageContext = z.infer<typeof SlackMessageContextSchema>;

// Schema for Slack decision request
export const SlackDecisionRequestSchema = z.object({
  type: z.literal(MessageTypes.DECISION_REQUEST),
  sender: z.string(),
  timestamp: z.number(),
  payload: z.object({
    decisionId: z.string(),
    context: SlackMessageContextSchema,
  }),
});

export type SlackDecisionRequest = z.infer<typeof SlackDecisionRequestSchema>;

// Schema for Slack error messages
export const SlackErrorMessageSchema = z.object({
  type: z.literal(MessageTypes.ERROR),
  sender: z.string(),
  timestamp: z.number(),
  payload: z.object({
    error: z.string(),
    stack: z.string().optional(),
    context: SlackMessageContextSchema.optional(),
  }),
});

export type SlackErrorMessage = z.infer<typeof SlackErrorMessageSchema>;

// Schema for Slack response messages
export const SlackResponseMessageSchema = z.object({
  type: z.literal(MessageTypes.DECISION_RESPONSE),
  sender: z.string(),
  timestamp: z.number(),
  payload: z.object({
    decisionId: z.string(),
    result: z.string(),
    context: SlackMessageContextSchema,
  }),
});

export type SlackResponseMessage = z.infer<typeof SlackResponseMessageSchema>;
