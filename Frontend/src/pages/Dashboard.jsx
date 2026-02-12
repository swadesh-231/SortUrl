import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link2, MousePointerClick, TrendingUp } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import UrlForm from '../components/url/UrlForm';
import UrlCard from '../components/url/UrlCard';
import AnalyticsModal from '../components/analytics/AnalyticsModal';
import OverviewChart from '../components/analytics/OverviewChart';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { UrlCardSkeleton } from '../components/ui/Loader';
import { urlAPI } from '../services/api';
import { formatLocalDate } from '../utils/formatters';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.4, delay: i * 0.1 },
    }),
};

const Dashboard = () => {
    const [urls, setUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUrl, setSelectedUrl] = useState(null);
    const [overviewData, setOverviewData] = useState([]);
    const [totalClicks30d, setTotalClicks30d] = useState(null);

    const fetchUrls = async () => {
        try {
            const response = await urlAPI.getMyUrls();
            setUrls(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load URLs');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOverview = async () => {
        try {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - 30);
            const response = await urlAPI.getTotalClicks(formatLocalDate(start), formatLocalDate(end));
            const data = response.data;
            if (data && typeof data === 'object') {
                const arr = Object.entries(data)
                    .map(([date, count]) => ({ clickDate: date, count }))
                    .sort((a, b) => a.clickDate.localeCompare(b.clickDate));
                setOverviewData(arr);
                setTotalClicks30d(arr.reduce((s, d) => s + d.count, 0));
            }
        } catch {
            setTotalClicks30d(0);
        }
    };

    useEffect(() => {
        fetchUrls();
        fetchOverview();
    }, []);

    const handleUrlCreated = (newUrl) => setUrls(prev => [newUrl, ...prev]);
    const handleDelete = (urlId) => setUrls(prev => prev.filter(u => u.id !== urlId));
    const totalAllClicks = urls.reduce((sum, u) => sum + u.clickCount, 0);

    const stats = [
        { label: 'Total Links', value: urls.length, icon: Link2 },
        { label: 'Total Clicks', value: totalAllClicks, icon: MousePointerClick },
        { label: 'Last 30 Days', value: totalClicks30d ?? '—', icon: TrendingUp },
    ];

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
                {/* Header */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                    <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
                    <p className="text-sm mt-0.5 text-zinc-500">Manage and track your short URLs</p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div key={stat.label} variants={fadeUp} initial="hidden" animate="visible" custom={i + 1}>
                            <Card>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-indigo-500/10">
                                        <stat.icon className="w-4 h-4 text-indigo-400" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                        {stat.label}
                                    </span>
                                </div>
                                <p className="text-3xl font-bold text-zinc-100">
                                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Overview Chart */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                    <Card>
                        <OverviewChart data={overviewData} label="All links — last 30 days" />
                    </Card>
                </motion.div>

                {/* URL Form */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
                    <UrlForm onUrlCreated={handleUrlCreated} />
                </motion.div>

                {/* URL List */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-zinc-100">Your URLs</h2>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                            {urls.length} total
                        </span>
                    </div>

                    {isLoading ? (
                        <div className="grid gap-3">
                            {[0, 1, 2].map(i => <UrlCardSkeleton key={i} />)}
                        </div>
                    ) : error ? (
                        <Card className="text-center py-8">
                            <p className="text-sm mb-4 text-red-400">{error}</p>
                            <Button variant="secondary" size="sm" onClick={() => { setError(''); setIsLoading(true); fetchUrls(); }}>
                                Try again
                            </Button>
                        </Card>
                    ) : urls.length === 0 ? (
                        <Card className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-indigo-500/10">
                                <Link2 className="w-7 h-7 text-indigo-400" />
                            </div>
                            <h3 className="text-base font-semibold mb-1 text-zinc-100">No URLs yet</h3>
                            <p className="text-sm text-zinc-500">Create your first short URL above</p>
                        </Card>
                    ) : (
                        <div className="grid gap-3">
                            {urls.map((url, i) => (
                                <UrlCard
                                    key={url.id}
                                    url={url}
                                    index={i}
                                    onViewAnalytics={setSelectedUrl}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Analytics Modal */}
            {selectedUrl && <AnalyticsModal url={selectedUrl} onClose={() => setSelectedUrl(null)} />}
        </MainLayout>
    );
};

export default Dashboard;
