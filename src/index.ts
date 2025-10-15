import { Chatbot } from './lib/chatbot';
import type { ChatbotConfig } from './types';

// Extend the Window interface to include ChatbotWidget
declare global {
  interface Window {
    ChatbotWidget?: typeof ChatbotWidget;
  }
}

// Export types
export type { ChatbotConfig, Message, ChatResponse } from './types';

// Export main class
export { Chatbot };

// Global instance
let chatbotInstance: Chatbot | null = null;

// Public API
export const ChatbotWidget = {
  /**
   * Initialize the chatbot widget
   */
  init(config: ChatbotConfig): Chatbot {
    if (chatbotInstance) {
      console.warn('Chatbot is already initialized. Destroying previous instance.');
      chatbotInstance.destroy();
    }

    chatbotInstance = new Chatbot(config);
    return chatbotInstance;
  },

  /**
   * Get the current chatbot instance
   */
  getInstance(): Chatbot | null {
    return chatbotInstance;
  },

  /**
   * Destroy the chatbot widget
   */
  destroy(): void {
    if (chatbotInstance) {
      chatbotInstance.destroy();
      chatbotInstance = null;
    }
  },
};

// Attach to window for UMD usage
if (typeof window !== 'undefined') {
  (window as Window & typeof globalThis).ChatbotWidget = ChatbotWidget;
  (window as Window & typeof globalThis & { CoffeeSip?: typeof ChatbotWidget }).CoffeeSip = ChatbotWidget; // Alternative name
}

// Default export
export default ChatbotWidget;
