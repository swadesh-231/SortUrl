import { useState } from 'react';
import { urlAPI } from '../services/api';

const UrlForm = ({ onUrlCreated }) => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortUrl('');
        setCopied(false);

        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        setIsLoading(true);

        try {
            const response = await urlAPI.createShortUrl(url);
            const fullShortUrl = `http://localhost:8080/api/v1/${response.data.shortUrl}`;
            setShortUrl(fullShortUrl);
            setUrl('');
            if (onUrlCreated) {
                onUrlCreated(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create short URL');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Shorten a URL</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <div className="flex gap-3">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter your long URL here..."
                            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Shortening...
                                </span>
                            ) : (
                                'Shorten'
                            )}
                        </button>
                    </div>
                    {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
                </div>
            </form>

            {shortUrl && (
                <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-600">
                    <p className="text-slate-400 text-sm mb-2">Your shortened URL:</p>
                    <div className="flex items-center gap-3">
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-indigo-400 hover:text-indigo-300 font-medium truncate"
                        >
                            {shortUrl}
                        </a>
                        <button
                            onClick={copyToClipboard}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${copied
                                    ? 'bg-green-600 text-white'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                                }`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UrlForm;
