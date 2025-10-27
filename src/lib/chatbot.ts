import type { ChatbotConfig, Message } from '../types';
import { ApiClient } from './api-client';
import { createElement, injectStyles, escapeHtml, formatTime } from './dom-utils';
import { chatbotStyles } from '../styles/chatbot.css';
import { marked } from 'marked';

export class Chatbot {
  private config: ChatbotConfig;
  private apiClient: ApiClient;
  private container: HTMLDivElement | null = null;
  private chatWindow: HTMLDivElement | null = null;
  private messagesContainer: HTMLDivElement | null = null;
  private inputField: HTMLInputElement | null = null;
  private sendButton: HTMLButtonElement | null = null;
  private isOpen = false;
  private messages: Message[] = [];

  constructor(config: ChatbotConfig) {
    this.config = {
      theme: 'light',
      position: 'bottom-right',
      ...config,
    };
    this.apiClient = new ApiClient(config.apiUrl, config.apiKey, config.chatbot);

    // Configure marked for safe rendering
    marked.setOptions({
      breaks: true, // Convert \n to <br>
      gfm: true, // GitHub Flavored Markdown
    });

    this.init();
  }

  private init(): void {
    // Inject styles
    injectStyles(chatbotStyles, 'coffee-sip-styles');

    // Apply custom primary color if provided
    if (this.config.primaryColor) {
      injectStyles(
        `.coffee-sip-widget { --cs-primary-color: ${this.config.primaryColor}; }`,
        'coffee-sip-custom-color'
      );
    }

    // Create widget container
    this.createWidget();
  }

  private createWidget(): void {
    // Main container
    this.container = createElement('div', 'coffee-sip-widget');
    this.container.classList.add(`position-${this.config.position}`);
    this.container.classList.add(`theme-${this.config.theme}`);

    // Floating button
    const button = this.createFloatingButton();
    this.container.appendChild(button);

    // Chat window
    this.chatWindow = this.createChatWindow();
    this.container.appendChild(this.chatWindow);

    // Append to body
    document.body.appendChild(this.container);
  }

  private createFloatingButton(): HTMLButtonElement {
    const button = createElement('button', 'coffee-sip-button');
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square-icon lucide-bot-message-square">
      <path d="M12 6V2H8"/>
      <path d="M15 11v2"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path fill="none" d="M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>
      <path d="M9 11v2"/>
      </svg>
    `;
    button.addEventListener('click', () => this.toggle());
    return button;
  }

  private createChatWindow(): HTMLDivElement {
    const window = createElement('div', 'coffee-sip-chat-window');

    // Header
    const header = createElement('div', 'coffee-sip-chat-header');
    const title = createElement('h3', 'coffee-sip-chat-title');
    title.textContent = 'Chat with us';
    const closeBtn = createElement('button', 'coffee-sip-close-btn');
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', () => this.close());
    header.appendChild(title);
    header.appendChild(closeBtn);

    // Messages container
    this.messagesContainer = createElement('div', 'coffee-sip-messages');

    // Input area
    const inputArea = createElement('div', 'coffee-sip-input-area');
    this.inputField = createElement('input', 'coffee-sip-input');
    this.inputField.type = 'text';
    this.inputField.placeholder = 'Type your message...';
    this.inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    this.sendButton = createElement('button', 'coffee-sip-send-btn');
    this.sendButton.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
      </svg>
    `;
    this.sendButton.addEventListener('click', () => this.sendMessage());

    inputArea.appendChild(this.inputField);
    inputArea.appendChild(this.sendButton);

    window.appendChild(header);
    window.appendChild(this.messagesContainer);
    window.appendChild(inputArea);

    // Add welcome message
    this.addMessage({
      id: Date.now().toString(),
      text: this.config.welcomeMessage || "Hello! I'm AI Assistant, how can I help you?",
      sender: 'bot',
      timestamp: new Date(),
    });

    return window;
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    if (!this.chatWindow || this.isOpen) return;

    this.chatWindow.classList.add('open');
    this.isOpen = true;
    this.inputField?.focus();

    if (this.config.onOpen) {
      this.config.onOpen();
    }
  }

  private close(): void {
    if (!this.chatWindow || !this.isOpen) return;

    this.chatWindow.classList.remove('open');
    this.isOpen = false;

    if (this.config.onClose) {
      this.config.onClose();
    }
  }

  private async sendMessage(): Promise<void> {
    if (!this.inputField || !this.sendButton) return;

    const message = this.inputField.value.trim();
    if (!message) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    this.addMessage(userMessage);

    // Clear input and disable
    this.inputField.value = '';
    this.sendButton.disabled = true;

    // Trigger callback
    if (this.config.onMessageSend) {
      this.config.onMessageSend(message);
    }

    // Show typing indicator
    this.showTypingIndicator();

    // Send to API
    const response = await this.apiClient.sendMessage(message);

    // Remove typing indicator
    this.hideTypingIndicator();

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.success
        ? response.message
        : `Sorry, I encountered an error: ${response.error}`,
      sender: 'bot',
      timestamp: new Date(),
    };
    this.addMessage(botMessage);

    // Trigger callback
    if (this.config.onMessageReceive && response.success) {
      this.config.onMessageReceive(response.message);
    }

    // Re-enable input
    this.sendButton.disabled = false;
    this.inputField?.focus();
  }

  private addMessage(message: Message): void {
    if (!this.messagesContainer) return;

    this.messages.push(message);

    const messageDiv = createElement('div', `coffee-sip-message ${message.sender}`);
    const bubble = createElement('div', 'coffee-sip-message-bubble');

    // Render bot messages as markdown, user messages as plain text
    if (message.sender === 'bot') {
      bubble.innerHTML = marked.parse(message.text) as string;
    } else {
      bubble.innerHTML = escapeHtml(message.text);
    }

    const time = createElement('div', 'coffee-sip-message-time');
    time.textContent = formatTime(message.timestamp);

    messageDiv.appendChild(bubble);
    messageDiv.appendChild(time);
    this.messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  private showTypingIndicator(): void {
    if (!this.messagesContainer) return;

    const typingDiv = createElement('div', 'coffee-sip-message bot');
    typingDiv.id = 'coffee-sip-typing-indicator';

    const bubble = createElement('div', 'coffee-sip-message-bubble');
    const typing = createElement('div', 'coffee-sip-typing');
    typing.innerHTML = `
      <div class="coffee-sip-typing-dot"></div>
      <div class="coffee-sip-typing-dot"></div>
      <div class="coffee-sip-typing-dot"></div>
    `;

    bubble.appendChild(typing);
    typingDiv.appendChild(bubble);
    this.messagesContainer.appendChild(typingDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  private hideTypingIndicator(): void {
    const indicator = document.getElementById('coffee-sip-typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }

    const styles = document.getElementById('coffee-sip-styles');
    if (styles) {
      styles.remove();
    }

    const customStyles = document.getElementById('coffee-sip-custom-color');
    if (customStyles) {
      customStyles.remove();
    }
  }

  public updateConfig(newConfig: Partial<ChatbotConfig>): void {
    this.config = { ...this.config, ...newConfig };

    if (newConfig.apiUrl || newConfig.apiKey || newConfig.chatbot) {
      this.apiClient.updateConfig(newConfig.apiUrl, newConfig.apiKey, newConfig.chatbot);
    }
  }

  public getMessages(): Message[] {
    return [...this.messages];
  }

  public clearMessages(): void {
    this.messages = [];
    if (this.messagesContainer) {
      this.messagesContainer.innerHTML = '';
    }
  }
}
