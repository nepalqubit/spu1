// Global type definitions

// Make sure regenerator-runtime is properly typed
declare module 'regenerator-runtime/runtime' {
  const runtime: any;
  export default runtime;
}

// SpeechRecognition Web API types
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
  mozSpeechRecognition: any;
  msSpeechRecognition: any;
}

// Add any other global types or module declarations here 