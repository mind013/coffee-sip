export interface ChatbotConfig {
  apiUrl: string;
  apiKey: string;
  chatbot: string;
  theme?: 'light' | 'dark';
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onMessageSend?: (message: string) => void;
  onMessageReceive?: (message: string) => void;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  success: boolean;
  error?: string;
}
