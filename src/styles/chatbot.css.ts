export const chatbotStyles = `
/* Coffee Sip Chatbot Widget Styles */
.coffee-sip-widget {
  --cs-primary-color: #007bff;
  --cs-primary-hover: #9abee6ff;
  --cs-bg-color: #ffffff;
  --cs-text-color: #333333;
  --cs-user-msg-bg: #007bff;
  --cs-bot-msg-bg: #f1f3f4;
  --cs-border-color: #e0e0e0;
  --cs-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  position: fixed;
  z-index: 999999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.coffee-sip-widget.position-bottom-right {
  bottom: 20px;
  right: 20px;
}

.coffee-sip-widget.position-bottom-left {
  bottom: 20px;
  left: 20px;
}

.coffee-sip-widget.theme-dark {
  --cs-bg-color: #2d2d2d;
  --cs-text-color: #ffffff;
  --cs-bot-msg-bg: #3a3a3a;
  --cs-border-color: #404040;
}

/* Dark theme markdown code blocks */
.coffee-sip-widget.theme-dark .coffee-sip-message.bot .coffee-sip-message-bubble code {
  background-color: rgba(255, 255, 255, 0.1);
}

.coffee-sip-widget.theme-dark .coffee-sip-message.bot .coffee-sip-message-bubble pre {
  background-color: rgba(255, 255, 255, 0.1);
}

.coffee-sip-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--cs-primary-color);
  border: none;
  cursor: pointer;
  box-shadow: var(--cs-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background-color 0.2s;
}

.coffee-sip-button:hover {
  background-color: var(--cs-primary-hover);
  transform: scale(1.1);
}

.coffee-sip-button svg {
  width: 28px;
  height: 28px;
  fill: white;
}

.coffee-sip-button.hidden {
  display: none;
}

.coffee-sip-chat-window {
  position: absolute;
  bottom: 80px;
  width: 380px;
  height: 550px;
  background-color: var(--cs-bg-color);
  border-radius: 12px;
  box-shadow: var(--cs-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s, transform 0.3s;
  pointer-events: none;
}

.coffee-sip-widget.position-bottom-right .coffee-sip-chat-window {
  right: 0;
}

.coffee-sip-widget.position-bottom-left .coffee-sip-chat-window {
  left: 0;
}

.coffee-sip-chat-window.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.coffee-sip-chat-header {
  background-color: var(--cs-primary-color);
  color: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.coffee-sip-chat-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.coffee-sip-close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.coffee-sip-close-btn:hover {
  opacity: 0.8;
}

.coffee-sip-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: var(--cs-bg-color);
}

.coffee-sip-message {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.coffee-sip-message.user {
  align-items: flex-end;
}

.coffee-sip-message.bot {
  align-items: flex-start;
}

.coffee-sip-message-bubble {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 18px;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.4;
}

.coffee-sip-message.user .coffee-sip-message-bubble {
  background-color: var(--cs-user-msg-bg);
  color: white;
  border-bottom-right-radius: 4px;
}

.coffee-sip-message.bot .coffee-sip-message-bubble {
  background-color: var(--cs-bot-msg-bg);
  color: var(--cs-text-color);
  border-bottom-left-radius: 4px;
}

/* Markdown styling for bot messages */
.coffee-sip-message.bot .coffee-sip-message-bubble p {
  margin: 0 0 8px 0;
}

.coffee-sip-message.bot .coffee-sip-message-bubble p:last-child {
  margin-bottom: 0;
}

.coffee-sip-message.bot .coffee-sip-message-bubble strong {
  font-weight: 600;
}

.coffee-sip-message.bot .coffee-sip-message-bubble em {
  font-style: italic;
}

.coffee-sip-message.bot .coffee-sip-message-bubble code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 0.9em;
}

.coffee-sip-message.bot .coffee-sip-message-bubble pre {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 8px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 8px 0;
}

.coffee-sip-message.bot .coffee-sip-message-bubble pre code {
  background-color: transparent;
  padding: 0;
}

.coffee-sip-message.bot .coffee-sip-message-bubble ul,
.coffee-sip-message.bot .coffee-sip-message-bubble ol {
  margin: 8px 0;
  padding-left: 20px;
}

.coffee-sip-message.bot .coffee-sip-message-bubble li {
  margin: 4px 0;
}

.coffee-sip-message.bot .coffee-sip-message-bubble a {
  color: var(--cs-primary-color);
  text-decoration: underline;
}

.coffee-sip-message.bot .coffee-sip-message-bubble blockquote {
  border-left: 3px solid var(--cs-border-color);
  margin: 8px 0;
  padding-left: 12px;
  font-style: italic;
  opacity: 0.9;
}

.coffee-sip-message.bot .coffee-sip-message-bubble h1,
.coffee-sip-message.bot .coffee-sip-message-bubble h2,
.coffee-sip-message.bot .coffee-sip-message-bubble h3,
.coffee-sip-message.bot .coffee-sip-message-bubble h4 {
  margin: 8px 0 4px 0;
  font-weight: 600;
  line-height: 1.3;
}

.coffee-sip-message.bot .coffee-sip-message-bubble h1 { font-size: 1.2em; }
.coffee-sip-message.bot .coffee-sip-message-bubble h2 { font-size: 1.15em; }
.coffee-sip-message.bot .coffee-sip-message-bubble h3 { font-size: 1.1em; }
.coffee-sip-message.bot .coffee-sip-message-bubble h4 { font-size: 1.05em; }

.coffee-sip-message-time {
  font-size: 11px;
  color: #999;
  margin-top: 4px;
  padding: 0 4px;
}

.coffee-sip-input-area {
  border-top: 1px solid var(--cs-border-color);
  padding: 16px;
  background-color: var(--cs-bg-color);
  display: flex;
  gap: 8px;
}

.coffee-sip-input {
  flex: 1;
  border: 1px solid var(--cs-border-color);
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 14px;
  outline: none;
  background-color: var(--cs-bg-color);
  color: var(--cs-text-color);
}

.coffee-sip-input:focus {
  border-color: var(--cs-primary-color);
}

.coffee-sip-send-btn {
  background-color: var(--cs-primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.coffee-sip-send-btn:hover:not(:disabled) {
  background-color: var(--cs-primary-hover);
}

.coffee-sip-send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.coffee-sip-send-btn svg {
  width: 20px;
  height: 20px;
  fill: white;
}

.coffee-sip-typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
}

.coffee-sip-typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #999;
  animation: typing 1.4s infinite;
}

.coffee-sip-typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.coffee-sip-typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .coffee-sip-chat-window {
    width: calc(100vw - 40px);
    height: calc(100vh - 120px);
  }
}
`;
