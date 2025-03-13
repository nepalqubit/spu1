# RevX AI Assistant

A modern AI voice assistant built for RevX digital consulting firm, powered by Next.js and speech recognition.

## Features

- Voice input using browser's speech recognition
- Text input support
- Modern, responsive UI
- Copy-to-clipboard functionality
- Real-time transcription display
- RevX-specific knowledge base

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Modern web browser with speech recognition support

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd revx-ai-assistant
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a GitHub, GitLab, or Bitbucket repository.

2. Visit [Vercel Dashboard](https://vercel.com/dashboard) and login.

3. Click "New Project" and import your repository.

4. Select the repository and configure your project settings.
   - Framework preset: Next.js
   - Root directory: ./spu-ai (if your project is in a subdirectory)

5. Click "Deploy" and wait for the build to complete.

6. Your app will be available at a Vercel URL (e.g., revx-ai-assistant.vercel.app)

## Environment Variables

To configure the app, you may need to set the following environment variables in Vercel:

- `NEXT_PUBLIC_APP_NAME`: RevX AI Assistant
- `NEXT_PUBLIC_APP_DESCRIPTION`: Your intelligent voice assistant for RevX digital consulting

## Browser Support

This application requires a modern browser that supports the Web Speech API:
- Google Chrome
- Microsoft Edge
- Safari (with permissions)

## License

MIT
