import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, BarChart3, ExternalLink, MousePointerClick, Calendar, Trash2 } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';
import { truncateUrl, formatDate } from '../../utils/formatters';
import { urlAPI } from '../../services/api';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import toast from 'react-hot-toast';

const UrlCard = ({ url, onViewAnalytics, onDelete, index = 0 }) => {
    const { copied, copy } = useClipboard();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Point to backend's RedirectController for proper 302 redirect + click tracking
    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
    const redirectUrl = `${API_BASE}/${url.shortUrl}`;

    const handleDelete = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            // Auto-cancel after 3 seconds
            setTimeout(() => setConfirmDelete(false), 3000);
            return;
        }

        setDeleting(true);
        try {
            await urlAPI.deleteUrl(url.shortUrl);
            toast.success('URL deleted');
            onDelete?.(url.id);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete URL');
        } finally {
            setDeleting(false);
            setConfirmDelete(false);
        }
    };

    return (
        <motion.div
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors duration-200"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
        >
            {/* Top row */}
            <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0 flex-1">
                    <a
                        href={redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center gap-1.5 transition-colors"
                    >
                        {url.shortUrl}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <p className="text-xs mt-1 truncate text-zinc-500">
                        {truncateUrl(url.originalUrl)}
                    </p>
                </div>
                <Badge color="indigo">
                    <MousePointerClick className="w-3 h-3 mr-1" />
                    {url.clickCount}
                </Badge>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    icon={copied ? Check : Copy}
                    onClick={() => copy(redirectUrl)}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    icon={BarChart3}
                    onClick={() => onViewAnalytics(url)}
                >
                    Analytics
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    loading={deleting}
                    onClick={handleDelete}
                >
                    {confirmDelete ? 'Confirm?' : 'Delete'}
                </Button>
                <span className="ml-auto text-[11px] flex items-center gap-1 text-zinc-500">
                    <Calendar className="w-3 h-3" />
                    {formatDate(url.createdDate)}
                </span>
            </div>
        </motion.div>
    );
};

export default UrlCard;
