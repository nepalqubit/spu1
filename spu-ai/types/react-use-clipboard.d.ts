declare module 'react-use-clipboard' {
  type UseClipboardOptions = {
    successDuration?: number;
    onSuccess?: () => void;
    onError?: () => void;
  };

  export default function useClipboard(
    text: string, 
    options?: UseClipboardOptions
  ): [boolean, () => void];
} 