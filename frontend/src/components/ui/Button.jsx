import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    className = '',
    onClick,
    type = 'button',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/60 transition-all active:scale-[0.98]',
        secondary: 'bg-white border border-neutral-200 hover:border-indigo-200 hover:bg-indigo-50/30 text-neutral-700 hover:text-indigo-700 shadow-sm transition-all',
        outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 transition-all',
        ghost: 'hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-all',
        danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-200/50 hover:shadow-rose-300/60 transition-all',
        success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200/50 transition-all',
        glow: 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] hover:bg-indigo-700 transition-all active:scale-[0.98]',
    };


    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-[15px]',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <motion.button
            whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
            whileTap={{ scale: disabled || isLoading ? 1 : 0.99 }}
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processing...</span>
                </div>
            ) : children}
        </motion.button>
    );
};

export default Button;

