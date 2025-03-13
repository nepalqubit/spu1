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
      // Ensure regenerator-runtime is available globally
      if (!window.regeneratorRuntime) {
        window.regeneratorRuntime = require('regenerator-runtime');
      }
      
      // Set up browser-specific speech recognition
      window.SpeechRecognition = window.SpeechRecognition || 
                                window.webkitSpeechRecognition;
    }
  }, []);
  
  return null; // This component doesn't render anything
} 