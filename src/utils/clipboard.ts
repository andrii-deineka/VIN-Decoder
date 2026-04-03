export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch (clipboardError) {
    // fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const success = document.execCommand('copy');
      if (!success) {
        throw new Error('Fallback clipboard copy failed');
      }
    } catch (fallbackError) {
      throw fallbackError;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};