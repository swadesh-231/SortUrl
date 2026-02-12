import { motion } from 'framer-motion';

const Card = ({ children, hover = false, className = '', padding = 'p-6', ...props }) => {
    const Comp = hover ? motion.div : 'div';
    const motionProps = hover ? {
        whileHover: { y: -2, transition: { duration: 0.2 } },
    } : {};

    return (
        <Comp
            className={`bg-zinc-900 border border-zinc-800 rounded-xl ${hover ? 'hover:border-zinc-700 transition-colors duration-200' : ''} ${padding} ${className}`}
            {...motionProps}
            {...props}
        >
            {children}
        </Comp>
    );
};

export default Card;
