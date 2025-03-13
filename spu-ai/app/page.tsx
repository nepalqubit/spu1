import Script from 'next/script';
import dynamic from 'next/dynamic';
import { SpeechSetup } from './components/SpeechSetup';

// Dynamically import the client component with no SSR to prevent hydration issues
const ClientHome = dynamic(() => import('./page.client'), { 
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-[600px] items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-200 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-blue-200 rounded mb-3"></div>
        <div className="h-3 w-24 bg-blue-100 rounded"></div>
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-4">
      {/* Import regenerator-runtime directly into the page */}
      <Script
        src="https://unpkg.com/regenerator-runtime@0.13.9/runtime.js"
        strategy="beforeInteractive"
      />

      {/* Add the SpeechSetup component to initialize everything properly */}
      <SpeechSetup />

      <div className="max-w-4xl mx-auto my-8">
        <div className="text-center mb-8">
          <div className="inline-block p-2 bg-blue-600 text-white rounded-lg mb-3 text-sm font-medium">
            AI-Powered Assistant
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="text-blue-600">RevX</span> AI Assistant
          </h1>
          <p className="text-gray-600 mb-4 max-w-xl mx-auto">
            Your intelligent voice-enabled companion for learning about RevX's digital consulting services and solutions.
          </p>
        </div>

        {/* Client-side rendered component for speech recognition */}
        <ClientHome />

        <div className="mt-8 flex flex-col items-center justify-center">
          <div className="flex space-x-4 mb-3">
            <a href="https://revx.pro" className="text-blue-600 hover:text-blue-800 transition-colors">
              Website
            </a>
            <span className="text-gray-300">|</span>
            <a href="mailto:info@revx.pro" className="text-blue-600 hover:text-blue-800 transition-colors">
              Contact
            </a>
            <span className="text-gray-300">|</span>
            <a href="https://revx.pro/about" className="text-blue-600 hover:text-blue-800 transition-colors">
              About
            </a>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} RevX.Pro Designed by TechZen
          </p>
        </div>
      </div>
    </main>
  );
} 