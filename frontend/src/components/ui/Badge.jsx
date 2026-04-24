import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-neutral-100 text-neutral-700',
        primary: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
        success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
        warning: 'bg-amber-50 text-amber-700 border border-amber-100',
        danger: 'bg-rose-50 text-rose-700 border border-rose-100',
        purple: 'bg-violet-50 text-violet-700 border border-violet-100',
        cyan: 'bg-cyan-50 text-cyan-700 border border-cyan-100',
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold tracking-tight uppercase ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;

