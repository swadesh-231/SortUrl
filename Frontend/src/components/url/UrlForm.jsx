import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Zap, Copy, Check, ExternalLink } from 'lucide-react';
import { urlAPI } from '../../services/api';
import { useClipboard } from '../../hooks/useClipboard';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import toast from 'react-hot-toast';

const UrlForm = ({ onUrlCreated }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const { copied, copy } = useClipboard();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedUrl = originalUrl.trim();
        if (!trimmedUrl) return;

        setLoading(true);
        setShortUrl('');
        try {
            const response = await urlAPI.createShortUrl(trimmedUrl);
            setShortUrl(response.data.shortUrl);
            setOriginalUrl('');
            onUrlCreated?.(response.data);
            toast.success('Short URL created!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create short URL');
        } finally {
            setLoading(false);
        }
    };

    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
    const fullShortUrl = shortUrl ? `${API_BASE}/${shortUrl}` : '';

    return (
        <Card>
            <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/10">
                    <Zap className="w-4 h-4 text-indigo-400" />
                </div>
                <h2 className="text-sm font-semibold text-zinc-100">Shorten a URL</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1">
                    <Input
                        placeholder="Paste your long URL here…"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        icon={Link2}
                    />
                </div>
                <Button type="submit" loading={loading} icon={Zap} className="shrink-0">
                    Shorten
                </Button>
            </form>

            {/* Result */}
            <AnimatePresence>
                {shortUrl && (
                    <motion.div
                        className="mt-4 bg-zinc-800 border border-zinc-700 rounded-xl p-4 flex items-center justify-between gap-3"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="min-w-0 flex-1">
                            <p className="text-xs mb-1 text-zinc-500">Shortened URL</p>
                            <a
                                href={fullShortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center gap-1 transition-colors"
                            >
                                {fullShortUrl}
                                <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            icon={copied ? Check : Copy}
                            onClick={() => copy(fullShortUrl)}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};

export default UrlForm;
