import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Ensure regenerator-runtime is loaded early */}
        <script src="https://unpkg.com/regenerator-runtime@0.13.9/runtime.js" />
        
        {/* Add any other global scripts needed */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Polyfill for speech recognition
              if (typeof window !== 'undefined') {
                window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
              }
            `,
          }}
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 