import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, icon: Icon, className = '', ...props }, ref) => {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                        <Icon className="w-4 h-4" />
                    </div>
                )}
                <input
                    ref={ref}
                    className={`
            w-full px-4 py-2.5 text-sm rounded-xl
            bg-zinc-900 border border-zinc-800 text-zinc-100
            placeholder:text-zinc-500
            outline-none transition-all duration-200
            focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
