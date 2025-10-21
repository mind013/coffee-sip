import type { ChatResponse } from '../types';

export class ApiClient {
  private apiUrl: string;
  private apiKey: string;
  private chatbotUuid: string;
  private sessionUuid: string;
  private readonly STORAGE_KEY = 'coffee-sip-session-uuid';

  constructor(apiUrl: string, apiKey: string, chatbotUuid: string) {
    // Use provided apiUrl or default to localhost for testing
    this.apiUrl = apiUrl || 'http://localhost:3000';
    this.apiKey = apiKey;
    this.chatbotUuid = chatbotUuid;
    this.sessionUuid = this.getOrCreateSessionUuid();
  }

  private getOrCreateSessionUuid(): string {
    try {
      // Try to get existing session from localStorage
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return stored;
      }
    } catch (error) {
      console.warn('localStorage not available:', error);
    }

    // Generate new session UUID
    const newSessionUuid = this.generateUuid();

    try {
      localStorage.setItem(this.STORAGE_KEY, newSessionUuid);
    } catch (error) {
      console.warn('Could not save session to localStorage:', error);
    }

    return newSessionUuid;
  }

  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      // Construct the full endpoint URL
      const endpoint = `${this.apiUrl}/public/chatbot/chat`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'mind13-chatbot-api-key': this.apiKey,
        },
        body: JSON.stringify({
          chatbot_uuid: this.chatbotUuid,
          session_uuid: this.sessionUuid,
          message,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();

      const botText = data.answer || data.message || data.response || 'No response from server';
      return {
        message: botText,
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

  updateConfig(apiUrl?: string, apiKey?: string, chatbotUuid?: string) {
    if (apiUrl) this.apiUrl = apiUrl;
    if (apiKey) this.apiKey = apiKey;
    if (chatbotUuid) this.chatbotUuid = chatbotUuid;
  }

  getSessionUuid(): string {
    return this.sessionUuid;
  }

  resetSession(): void {
    this.sessionUuid = this.generateUuid();
    try {
      localStorage.setItem(this.STORAGE_KEY, this.sessionUuid);
    } catch (error) {
      console.warn('Could not save new session to localStorage:', error);
    }
  }
}
