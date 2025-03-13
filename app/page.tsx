import Script from 'next/script';
import dynamic from 'next/dynamic';
import { SpeechSetup } from './components/SpeechSetup';

// Dynamically import the client component with no SSR to prevent hydration issues
const ClientHome = dynamic(() => import('./page.client'), { 
  ssr: false,
  loading: () => <p className="text-center py-4">Loading speech recognition...</p>
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      {/* Import regenerator-runtime directly into the page */}
      <Script
        src="https://unpkg.com/regenerator-runtime@0.13.9/runtime.js"
        strategy="beforeInteractive"
      />

      {/* Add the SpeechSetup component to initialize everything properly */}
      <SpeechSetup />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">RevX AI Assistant</h1>
          <p className="text-gray-600 mb-4">Your intelligent voice assistant for RevX digital consulting</p>
          
          <p className="text-sm text-gray-500 mb-6">
            Ask about RevX's services, case studies, contact information, or specific clients.
            Use the microphone button to speak your questions!
          </p>
        </div>

        {/* Client-side rendered component for speech recognition */}
        <ClientHome />

        <div className="mt-8 text-center text-xs text-gray-400">
          <p>Powered by Spu AI | © {new Date().getFullYear()} RevX</p>
        </div>
      </div>
    </main>
  );
} 