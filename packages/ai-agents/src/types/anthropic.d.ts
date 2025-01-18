declare module '@anthropic-ai/sdk' {
  export class Anthropic {
    constructor(config: { apiKey: string });
    messages: {
      create(params: {
        model: string;
        max_tokens: number;
        messages: Array<{
          role: string;
          content: string;
        }>;
      }): Promise<{
        content: Array<{
          text: string;
        }>;
      }>;
    };
  }
}
