# RevX AI Assistant with OpenRouter AI

A sophisticated AI assistant built for RevX digital consulting firm, enhanced with OpenRouter AI for intelligent responses.

## Features

* **AI-Powered Responses**: Uses OpenRouter.ai with Claude 3 Haiku for enhanced, intelligent responses
* **Context-Aware Conversations**: Maintains conversation history for more relevant responses
* **Local Knowledge Base**: Built-in information about RevX's services and offerings
* **Modern, Responsive UI**: Beautiful interface that works on all devices
* **Copy-to-Clipboard**: Easy sharing of AI responses

## Tech Stack

* **Next.js**: React framework for production
* **TypeScript**: Type-safe JavaScript
* **Tailwind CSS**: Utility-first CSS framework
* **OpenRouter.ai API**: Access to state-of-the-art AI models

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/nepalqubit/spu1.git
cd spu1/spu-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file with the following:
```
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_URL=https://openrouter.ai/api/v1/chat/completions
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## OpenRouter AI Integration

This assistant uses OpenRouter.ai to access powerful AI models like Claude 3 Haiku. The integration:

1. First generates a baseline answer from local knowledge
2. Sends the conversation history and baseline answer to OpenRouter
3. Receives an enhanced, more contextual response
4. Displays the AI-enhanced response to the user

## Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Login to your Vercel account:
```bash
vercel login
```

3. Deploy the project:
```bash
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Visit [Vercel Dashboard](https://vercel.com/dashboard)
3. Import your repository
4. Configure as a Next.js project
5. Add environment variables for OpenRouter
6. Deploy

## Environment Variables

Required for deployment:

* `OPENROUTER_API_KEY`: Your OpenRouter API key
* `OPENROUTER_URL`: The OpenRouter API endpoint

## License

MIT

## About RevX

RevX is a comprehensive technology and digital solutions provider specializing in software development, digital marketing, data science, AI solutions, and OTA (Online Travel Agency) revenue optimization.
