import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { Chatbot } from '../lib/chatbot';
import type { ChatbotConfig } from '../types';

describe('Chatbot Widget', () => {
  let dom: JSDOM;
  let chatbot: Chatbot;

  beforeEach(() => {
    // Setup DOM
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
      url: 'http://localhost',
    });
    global.document = dom.window.document as any;
    global.window = dom.window as any;

    const config: ChatbotConfig = {
      apiUrl: 'https://api.test.com/chat',
      apiKey: 'test-key',
      chatbot: 'test-bot',
    };

    chatbot = new Chatbot(config);
  });

  afterEach(() => {
    if (chatbot) {
      chatbot.destroy();
    }
  });

  it('should create chatbot widget in DOM', () => {
    const widget = document.querySelector('.coffee-sip-widget');
    expect(widget).toBeTruthy();
  });

  it('should have floating button', () => {
    const button = document.querySelector('.coffee-sip-button');
    expect(button).toBeTruthy();
  });

  it('should have chat window', () => {
    const chatWindow = document.querySelector('.coffee-sip-chat-window');
    expect(chatWindow).toBeTruthy();
  });

  it('should inject styles', () => {
    const styles = document.getElementById('coffee-sip-styles');
    expect(styles).toBeTruthy();
    expect(styles?.tagName).toBe('STYLE');
  });

  it('should apply correct theme class', () => {
    const widget = document.querySelector('.coffee-sip-widget');
    expect(widget?.classList.contains('theme-light')).toBe(true);
  });

  it('should apply correct position class', () => {
    const widget = document.querySelector('.coffee-sip-widget');
    expect(widget?.classList.contains('position-bottom-right')).toBe(true);
  });

  it('should destroy widget and cleanup', () => {
    chatbot.destroy();
    const widget = document.querySelector('.coffee-sip-widget');
    expect(widget).toBeNull();
  });

  it('should have welcome message', () => {
    const messages = chatbot.getMessages();
    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].sender).toBe('bot');
  });

  it('should clear messages', () => {
    chatbot.clearMessages();
    const messages = chatbot.getMessages();
    expect(messages.length).toBe(0);
  });
});
