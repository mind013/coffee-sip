# Environment Configuration

The Coffee Sip demo page uses environment variables to configure the chatbot connection. This allows you to test with different backends without modifying the code.

## Setup

1. Copy the example file:
```bash
cp .env.example .env
```

2. Edit `.env` with your chatbot configuration:
```env
VITE_CHATBOT_API_URL=http://localhost:3000
VITE_CHATBOT_API_KEY=your-api-key-here
VITE_CHATBOT_UUID=your-chatbot-uuid-here
```

## Variables

- `VITE_CHATBOT_API_URL` - Base URL of your chatbot API (e.g., `http://localhost:3000` or `https://api.example.com`)
- `VITE_CHATBOT_API_KEY` - API key for authentication (sent as `mind13-chatbot-api-key` header)
- `VITE_CHATBOT_UUID` - Unique identifier for your chatbot instance

## Usage

The environment variables are automatically loaded by Vite during development:

```bash
npm run dev
```

Open http://localhost:5173/ and the demo will use your configured values.

## Production Note

Environment variables prefixed with `VITE_` are **only available during build time** for the demo page. The production library (`dist/coffee-sip.*.js`) does not use these variables - you must pass configuration during initialization:

```javascript
ChatbotWidget.init({
  apiUrl: 'https://your-api.com',
  apiKey: 'your-key',
  chatbot: 'your-chatbot-id'
});
```

## Security

- Never commit `.env` to version control (it's in `.gitignore`)
- Use `.env.example` to document required variables
- For production deployments, use your hosting platform's environment variable system
