const colors = {
    indigo: 'bg-indigo-500/10 text-indigo-400',
    blue: 'bg-blue-500/10 text-blue-400',
    green: 'bg-emerald-500/10 text-emerald-400',
    red: 'bg-red-500/10 text-red-400',
    yellow: 'bg-amber-500/10 text-amber-400',
    gray: 'bg-zinc-800 text-zinc-400',
};

const Badge = ({ children, color = 'indigo', className = '' }) => {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${colors[color] || colors.indigo} ${className}`}
        >
            {children}
        </span>
    );
};

export default Badge;
