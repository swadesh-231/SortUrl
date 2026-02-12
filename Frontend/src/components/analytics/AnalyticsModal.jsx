import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ExternalLink } from 'lucide-react';
import { urlAPI } from '../../services/api';
import { formatLocalDateTime, formatDateShort } from '../../utils/formatters';
import Modal from '../ui/Modal';

const RANGES = [
    { label: '7d', days: 7 },
    { label: '30d', days: 30 },
    { label: '90d', days: 90 },
];

const AnalyticsModal = ({ url, onClose }) => {
    const [analytics, setAnalytics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeRange, setActiveRange] = useState(1); // default 30d

    useEffect(() => {
        if (!url) return;
        fetchAnalytics(RANGES[activeRange].days);
    }, [url, activeRange]);

    const fetchAnalytics = async (days) => {
        setLoading(true);
        try {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - days);

            const response = await urlAPI.getAnalytics(
                url.shortUrl,
                formatLocalDateTime(start),
                formatLocalDateTime(end)
            );
            setAnalytics(response.data || []);
        } catch {
            setAnalytics([]);
        } finally {
            setLoading(false);
        }
    };

    const totalClicks = useMemo(() => analytics.reduce((s, d) => s + d.count, 0), [analytics]);
    const maxCount = useMemo(() => Math.max(...analytics.map(d => d.count), 1), [analytics]);
    const avgClicks = analytics.length > 0 ? Math.round(totalClicks / analytics.length) : 0;

    return (
        <Modal isOpen={!!url} onClose={onClose} title="Analytics" maxWidth="max-w-xl">
            {/* URL info */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 mb-5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-indigo-400 truncate">{url.shortUrl}</p>
                    <p className="text-xs truncate mt-0.5 text-zinc-500">{url.originalUrl}</p>
                </div>
                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-zinc-400 hover:text-zinc-200 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>

            {/* Range selector */}
            <div className="flex items-center gap-1 mb-5 p-1 rounded-lg w-fit bg-zinc-800">
                {RANGES.map((range, i) => (
                    <button
                        key={range.label}
                        onClick={() => setActiveRange(i)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${activeRange === i
                                ? 'bg-indigo-500 text-white'
                                : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                    >
                        {range.label}
                    </button>
                ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-indigo-400">{totalClicks.toLocaleString()}</p>
                    <p className="text-[10px] uppercase mt-1 text-zinc-500">Total</p>
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-zinc-100">{avgClicks}</p>
                    <p className="text-[10px] uppercase mt-1 text-zinc-500">Avg/day</p>
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-zinc-100">{analytics.length}</p>
                    <p className="text-[10px] uppercase mt-1 text-zinc-500">Days</p>
                </div>
            </div>

            {/* Chart */}
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="w-8 h-8 rounded-full border-2 border-zinc-700 border-t-indigo-400 animate-spin" />
                </div>
            ) : analytics.length === 0 ? (
                <div className="text-center py-10">
                    <BarChart3 className="w-10 h-10 mx-auto mb-2 text-zinc-600" />
                    <p className="text-sm text-zinc-500">No click data for this period</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {analytics.map((item, i) => (
                        <div key={item.clickDate} className="flex items-center gap-3 group">
                            <span className="text-[11px] font-medium shrink-0 w-12 text-zinc-500">
                                {formatDateShort(item.clickDate)}
                            </span>
                            <div className="flex-1 h-6 rounded-md overflow-hidden bg-zinc-800">
                                <motion.div
                                    className="h-full rounded-md flex items-center justify-end pr-2 bg-indigo-500"
                                    style={{ originX: 0 }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: item.count / maxCount }}
                                    transition={{ duration: 0.5, delay: i * 0.03, ease: 'easeOut' }}
                                >
                                    {item.count / maxCount > 0.15 && (
                                        <span className="text-[10px] font-bold text-white">{item.count}</span>
                                    )}
                                </motion.div>
                            </div>
                            {item.count / maxCount <= 0.15 && (
                                <span className="text-[10px] font-medium text-zinc-500">{item.count}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </Modal>
    );
};

export default AnalyticsModal;
