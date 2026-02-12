import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
    primary: 'bg-indigo-500 text-white font-semibold hover:bg-indigo-400',
    secondary: 'bg-zinc-800 border border-zinc-700 text-zinc-300 font-medium hover:bg-zinc-700 hover:text-zinc-100',
    ghost: 'bg-transparent text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200',
    danger: 'bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20',
};

const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-7 py-3 text-base rounded-xl',
};

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon: Icon,
    className = '',
    ...props
}) => {
    const isDisabled = disabled || loading;

    return (
        <motion.button
            whileHover={isDisabled ? {} : { scale: 1.01 }}
            whileTap={isDisabled ? {} : { scale: 0.98 }}
            className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-200 cursor-pointer
        ${sizes[size]} ${variants[variant]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
            disabled={isDisabled}
            {...props}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : Icon ? (
                <Icon className="w-4 h-4" />
            ) : null}
            {children}
        </motion.button>
    );
};

export default Button;
