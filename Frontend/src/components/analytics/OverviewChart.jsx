import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const OverviewChart = ({ data = [], label = 'Last 30 days' }) => {
    if (data.length === 0) {
        return (
            <div className="text-center py-10">
                <BarChart3 className="w-10 h-10 mx-auto mb-2 text-zinc-700" />
                <p className="text-sm text-zinc-500">No click data yet</p>
            </div>
        );
    }

    const maxCount = Math.max(...data.map(d => d.count), 1);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-zinc-100">Click Overview</h3>
                    <p className="text-xs mt-0.5 text-zinc-500">{label}</p>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400">
                    {data.reduce((s, d) => s + d.count, 0).toLocaleString()} total
                </span>
            </div>

            {/* Bars */}
            <div className="flex items-end gap-[3px] h-28">
                {data.map((item, i) => (
                    <div key={item.clickDate} className="flex-1 relative group cursor-pointer">
                        {/* Tooltip */}
                        <div
                            className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10
                              bg-zinc-800 border border-zinc-700 text-zinc-100"
                        >
                            {item.count} clicks
                        </div>
                        <motion.div
                            className="w-full rounded-t-sm bg-indigo-500"
                            style={{ opacity: 0.65 }}
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max((item.count / maxCount) * 100, 4)}%` }}
                            transition={{ duration: 0.4, delay: i * 0.02, ease: 'easeOut' }}
                            whileHover={{ opacity: 0.9 }}
                        />
                    </div>
                ))}
            </div>

            {/* Date labels */}
            <div className="flex justify-between mt-2">
                <span className="text-[10px] text-zinc-500">{data[0]?.clickDate}</span>
                <span className="text-[10px] text-zinc-500">{data[data.length - 1]?.clickDate}</span>
            </div>
        </div>
    );
};

export default OverviewChart;
