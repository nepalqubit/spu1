declare module 'react-use-clipboard' {
  type UseClipboardOptions = {
    successDuration?: number;
    onSuccess?: () => void;
    onError?: (error: any) => void;
  };

  export default function useClipboard(
    text: string, 
    options?: UseClipboardOptions
  ): [boolean, () => void];
} 