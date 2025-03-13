declare module 'react-speech-recognition' {
  export type SpeechRecognitionOptions = {
    continuous?: boolean;
    interimResults?: boolean;
    language?: string;
  };

  export type SpeechRecognitionEvent = {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  };

  export type SpeechRecognitionHookResult = {
    transcript: string;
    interimTranscript: string;
    finalTranscript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
    isMicrophoneAvailable: boolean;
  };

  const SpeechRecognition: {
    startListening: (options?: SpeechRecognitionOptions) => void;
    stopListening: () => void;
    abortListening: () => void;
    getRecognition: () => any;
  };

  export default SpeechRecognition;

  export function useSpeechRecognition(options?: {
    transcribing?: boolean;
    clearTranscriptOnListen?: boolean;
    commands?: Array<{
      command: string | string[] | RegExp;
      callback: (...args: any[]) => void;
      matchInterim?: boolean;
      isFuzzyMatch?: boolean;
      fuzzyMatchingThreshold?: number;
      bestMatchOnly?: boolean;
    }>;
  }): SpeechRecognitionHookResult;
} 