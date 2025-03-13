'use client';

import 'regenerator-runtime/runtime';
import { useEffect, useState, ReactNode } from 'react';
import SpeechRecognition from 'react-speech-recognition';

// Add a global declaration for TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    regeneratorRuntime: any;
  }
}

interface SpeechRecognitionWrapperProps {
  children: ReactNode;
}

export default function SpeechRecognitionWrapper({ children }: SpeechRecognitionWrapperProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize speech recognition
    const initializeSpeechRecognition = async () => {
      try {
        if (typeof window !== 'undefined') {
          // Set up browser-specific speech recognition
          window.SpeechRecognition = window.SpeechRecognition || 
                                    window.webkitSpeechRecognition;
          
          // Check if regenerator-runtime is available
          if (!window.regeneratorRuntime && typeof require !== 'undefined') {
            try {
              window.regeneratorRuntime = require('regenerator-runtime');
            } catch (e) {
              console.error('Failed to load regenerator-runtime:', e);
            }
          }
          
          // Check if speech recognition is available
          if (!window.SpeechRecognition) {
            console.warn('Speech recognition is not supported in this browser');
          } else {
            setIsInitialized(true);
          }
        }
      } catch (error) {
        console.error('Failed to initialize speech recognition:', error);
      }
    };

    initializeSpeechRecognition();

    // Cleanup
    return () => {
      // Stop any ongoing recognition when component unmounts
      try {
        SpeechRecognition.abortListening();
      } catch (e) {
        console.log('Cleanup error:', e);
      }
    };
  }, []);

  if (!isInitialized) {
    return <div className="p-4">Initializing speech recognition...</div>;
  }

  return <>{children}</>;
} 