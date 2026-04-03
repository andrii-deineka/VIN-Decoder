import { useCallback } from 'react';
import toast from 'react-hot-toast';

export const useCopyToClipboard = () => {
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy');
    });
  }, []);

  return copy;
};