# ☕ Coffee Sip

A lightweight, framework-agnostic chatbot widget library that can be embedded on any website with a single line of code.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![Size](https://img.shields.io/badge/size-%3C100KB-green.svg)

## ✨ Features

- 🎯 **Framework-agnostic** - Works with any website (React, Vue, Angular, or plain HTML)
- 🪶 **Lightweight** - Less than 100KB uncompressed
- 🎨 **Customizable** - Themes, colors, and positioning
- 📱 **Responsive** - Mobile-friendly design
- 🔌 **Easy Integration** - Single script tag or npm install
- 🎣 **Event Hooks** - Listen to open, close, send, and receive events
- 🌗 **Theme Support** - Light and dark themes out of the box
- � **Markdown Support** - Bot responses rendered with full markdown formatting
- �📦 **TypeScript** - Full type definitions included
- 🚫 **Minimal Dependencies** - Only one small dependency (marked.js for markdown)

## 📦 Installation

### Via npm

```bash
npm install coffee-sip
```

### Via CDN (UMD)

```html
<script src="https://unpkg.com/coffee-sip@latest/dist/coffee-sip.umd.js"></script>
```

## 🚀 Quick Start

### ES Module (Recommended)

```typescript
import { ChatbotWidget } from 'coffee-sip';

ChatbotWidget.init({
  apiUrl: 'https://api.example.com/chat',
  apiKey: 'your-api-key-uuid',
  chatbot: 'chatbot-uuid',
  theme: 'light',
  position: 'bottom-right'
});
```

### UMD (Script Tag)

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to my site</h1>

  <!-- Load the chatbot widget -->
  <script src="https://unpkg.com/coffee-sip@latest/dist/coffee-sip.umd.js"></script>
  <script>
    window.ChatbotWidget.init({
      apiUrl: 'https://api.example.com/chat',
      apiKey: 'your-api-key-uuid',
      chatbot: 'chatbot-uuid'
    });
  </script>
</body>
</html>
```

## ⚙️ Configuration

### ChatbotConfig Interface

```typescript
interface ChatbotConfig {
  // Required
  apiUrl: string;           // Your API endpoint URL
  apiKey: string;           // API authentication key
  chatbot: string;          // Chatbot identifier

  // Optional
  theme?: 'light' | 'dark'; // UI theme (default: 'light')
  position?: 'bottom-right' | 'bottom-left'; // Widget position (default: 'bottom-right')
  primaryColor?: string;    // Custom primary color (default: '#007bff')
  welcomeMessage?: string;  // Initial bot message (default: "Hello! I'm AI Assistant, how I can help you?")

  // Event Callbacks
  onOpen?: () => void;      // Called when chat window opens
  onClose?: () => void;     // Called when chat window closes
  onMessageSend?: (message: string) => void;    // Called when user sends a message
  onMessageReceive?: (message: string) => void; // Called when bot responds
}
```

### Examples

#### Dark Theme

```javascript
ChatbotWidget.init({
  apiUrl: 'https://api.example.com/chat',
  apiKey: 'your-api-key',
  chatbot: 'chatbot-id',
  theme: 'dark'
});
```

#### Custom Color & Position

```javascript
ChatbotWidget.init({
  apiUrl: 'https://api.example.com/chat',
  apiKey: 'your-api-key',
  chatbot: 'chatbot-id',
  primaryColor: '#e74c3c',
  position: 'bottom-left'
});
```

#### Custom Welcome Message

```javascript
ChatbotWidget.init({
  apiUrl: 'https://api.example.com/chat',
  apiKey: 'your-api-key',
  chatbot: 'chatbot-id',
  welcomeMessage: 'Welcome to our support chat! How may I assist you today?'
});
```

#### With Event Hooks

```javascript
ChatbotWidget.init({
  apiUrl: 'https://api.example.com/chat',
  apiKey: 'your-api-key',
  chatbot: 'chatbot-id',
  onOpen: () => console.log('Chat opened!'),
  onClose: () => console.log('Chat closed!'),
  onMessageSend: (msg) => console.log('User sent:', msg),
  onMessageReceive: (msg) => console.log('Bot replied:', msg)
});
```

## 🔌 API Reference

### ChatbotWidget

The main entry point for the widget.

#### Methods

##### `init(config: ChatbotConfig): Chatbot`

Initialize the chatbot widget with the provided configuration.

```javascript
const chatbot = ChatbotWidget.init({
  apiUrl: 'https://api.example.com/chat',
  apiKey: 'key',
  chatbot: 'bot-id'
});
```

##### `getInstance(): Chatbot | null`

Get the current chatbot instance.

```javascript
const instance = ChatbotWidget.getInstance();
```

##### `destroy(): void`

Destroy the chatbot widget and remove it from the DOM.

```javascript
ChatbotWidget.destroy();
```

### Chatbot Instance Methods

#### `getMessages(): Message[]`

Get all messages in the current chat.

```javascript
const instance = ChatbotWidget.getInstance();
const messages = instance.getMessages();
```

#### `clearMessages(): void`

Clear all messages from the chat.

```javascript
const instance = ChatbotWidget.getInstance();
instance.clearMessages();
```

#### `updateConfig(config: Partial<ChatbotConfig>): void`

Update the configuration without recreating the widget.

```javascript
const instance = ChatbotWidget.getInstance();
instance.updateConfig({
  theme: 'dark',
  primaryColor: '#ff0000'
});
```

#### `destroy(): void`

Destroy the chatbot instance.

```javascript
const instance = ChatbotWidget.getInstance();
instance.destroy();
```

## 🌐 API Endpoint Format

The widget sends POST requests to your API endpoint with the following format:

### Request

```json
{
  "chatbot": "chatbot-uuid",
  "message": "User's message text",
  "timestamp": "2025-10-15T12:34:56.789Z"
}
```

### Expected Response

Your API should return a JSON response in this format:

```json
{
  "message": "Bot's response text",
  "success": true
}
```

Or with an error:

```json
{
  "message": "",
  "success": false,
  "error": "Error message"
}
```

## 🎨 Customization

### CSS Variables

You can override the default CSS variables for advanced customization:

```css
.coffee-sip-widget {
  --cs-primary-color: #007bff;
  --cs-primary-hover: #0056b3;
  --cs-bg-color: #ffffff;
  --cs-text-color: #333333;
  --cs-user-msg-bg: #007bff;
  --cs-bot-msg-bg: #f1f3f4;
  --cs-border-color: #e0e0e0;
  --cs-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

## 📝 Markdown Support

Bot responses are automatically rendered with full markdown support using the `marked` library. This allows for rich, formatted responses.

### Supported Markdown Features

- **Bold** and *italic* text
- `Inline code` and code blocks with syntax highlighting
- Headers (H1-H4)
- Ordered and unordered lists
- Blockquotes
- Links
- Tables (GitHub Flavored Markdown)

### Example Bot Response

```json
{
  "answer": "Here's how to **install** the package:\n\n```bash\nnpm install coffee-sip\n```\n\nKey features:\n- Easy integration\n- Customizable themes\n- Markdown support"
}
```

This will be rendered with proper formatting, bold text, code blocks, and bullet points.

### User Messages

User messages are rendered as plain text (HTML-escaped) for security. Only bot responses support markdown.

## � Customization

### CSS Variables

You can override the default CSS variables for advanced customization:

```css
.coffee-sip-widget {
  --cs-primary-color: #007bff;
  --cs-primary-hover: #0056b3;
  --cs-bg-color: #ffffff;
  --cs-text-color: #333333;
  --cs-user-msg-bg: #007bff;
  --cs-bot-msg-bg: #f1f3f4;
  --cs-border-color: #e0e0e0;
  --cs-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Setup

```bash
# Install dependencies
npm install

# Configure environment (for demo page)
cp .env.example .env
# Edit .env and add your chatbot configuration

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Environment Variables

The demo page uses environment variables for configuration. Create a `.env` file in the root directory:

```bash
VITE_CHATBOT_API_URL=http://localhost:3000
VITE_CHATBOT_API_KEY=your-api-key-here
VITE_CHATBOT_UUID=your-chatbot-uuid-here
```

These variables are only used in the demo page during development. The production library requires configuration to be passed during initialization.

### Project Structure

```
coffee-sip/
├── src/
│   ├── lib/
│   │   ├── chatbot.ts       # Main chatbot logic
│   │   ├── api-client.ts    # API communication
│   │   └── dom-utils.ts     # DOM helpers
│   ├── styles/
│   │   └── chatbot.css.ts   # Widget styles
│   ├── types.ts             # TypeScript types
│   └── index.ts             # Entry point
├── demo/
│   └── index.html           # Demo page
├── dist/                    # Build output
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 📝 License

MIT © [Your Name]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug? Please [open an issue](https://github.com/yourusername/coffee-sip/issues).

## 📚 Documentation

For more detailed documentation, visit our [documentation site](https://coffee-sip.dev) (coming soon).

---

Made with ☕ and TypeScript
