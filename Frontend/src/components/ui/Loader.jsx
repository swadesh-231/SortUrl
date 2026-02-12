import { motion } from 'framer-motion';

/** Branded spinner */
export const Spinner = ({ size = 'md', className = '' }) => {
    const s = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }[size];
    return (
        <div className={`${s} ${className}`}>
            <div
                className={`${s} rounded-full animate-spin border-2 border-zinc-700 border-t-indigo-400`}
            />
        </div>
    );
};

/** Full-page loader with fade */
export const PageLoader = () => (
    <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" />
            <span className="text-sm font-medium text-indigo-400">Loading…</span>
        </div>
    </motion.div>
);

/** Skeleton lines */
export const Skeleton = ({ className = '', width = '100%', height = '16px' }) => (
    <div className={`skeleton ${className}`} style={{ width, height }} />
);

/** Skeleton card for URL loading */
export const UrlCardSkeleton = () => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
        <Skeleton height="14px" width="40%" />
        <Skeleton height="12px" width="80%" />
        <div className="flex gap-3 pt-2">
            <Skeleton height="28px" width="80px" />
            <Skeleton height="28px" width="100px" />
            <Skeleton height="28px" width="80px" />
        </div>
    </div>
);
