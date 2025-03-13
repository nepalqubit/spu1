// This file properly sets up regenerator-runtime and browser speech recognition API
'use client';

import { useEffect } from 'react';

// Import regenerator-runtime directly at top level
import 'regenerator-runtime/runtime';

// Add a global declaration for TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    regeneratorRuntime: any;
  }
}

export function SpeechSetup() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Ensure regenerator-runtime is available globally
        if (!window.regeneratorRuntime) {
          window.regeneratorRuntime = require('regenerator-runtime');
          console.log('Regenerator runtime initialized successfully');
        }
        
        // Set up browser-specific speech recognition
        window.SpeechRecognition = window.SpeechRecognition || 
                                  window.webkitSpeechRecognition;
                                  
        if (!window.SpeechRecognition) {
          console.warn('Speech Recognition API is not supported in this browser. Please use Chrome, Edge, or Safari.');
        } else {
          console.log('Speech Recognition API initialized successfully');
        }
      } catch (error) {
        console.error('Failed to initialize speech recognition:', error);
      }
    }
  }, []);
  
  return null; // This component doesn't render anything
} 