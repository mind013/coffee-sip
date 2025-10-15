import type { ChatResponse } from '../types';

export class ApiClient {
  private apiUrl: string;
  private apiKey: string;
  private chatbot: string;

  constructor(apiUrl: string, apiKey: string, chatbot: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.chatbot = chatbot;
  }

  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          chatbot: this.chatbot,
          message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        message: data.message || data.response || 'No response from server',
        success: true,
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        message: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  updateConfig(apiUrl?: string, apiKey?: string, chatbot?: string) {
    if (apiUrl) this.apiUrl = apiUrl;
    if (apiKey) this.apiKey = apiKey;
    if (chatbot) this.chatbot = chatbot;
  }
}
