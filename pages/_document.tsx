import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Ensure regenerator-runtime is loaded early */}
        <script src="https://unpkg.com/regenerator-runtime@0.13.9/runtime.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 