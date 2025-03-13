'use client';

import 'regenerator-runtime/runtime';
import { useEffect, useState, ReactNode } from 'react';
import SpeechRecognition from 'react-speech-recognition';

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
          window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          
          // Check if available
          if (!window.SpeechRecognition) {
            console.warn('Speech recognition is not supported in this browser');
          }
          
          setIsInitialized(true);
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
    return null; // Or a loading spinner
  }

  return <>{children}</>;
} 