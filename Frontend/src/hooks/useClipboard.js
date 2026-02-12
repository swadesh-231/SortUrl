import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

/** Copy text to clipboard with toast feedback */
export const useClipboard = () => {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy');
        }
    }, []);

    return { copied, copy };
};
