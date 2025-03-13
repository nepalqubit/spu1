'use client';

import 'regenerator-runtime/runtime';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // Initialize polyfills and global dependencies
  useEffect(() => {
    // Make sure regeneratorRuntime is available globally
    if (typeof window !== 'undefined') {
      // Add any global browser polyfills here if needed
      // This is a good place to handle any browser-specific initialization
    }
  }, []);

  return <Component {...pageProps} />;
} 