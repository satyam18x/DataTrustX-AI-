import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={hover ? { y: -4, shadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)' } : {}}
            className={`bg-white border border-neutral-200 rounded-xl p-6 shadow-sm ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;

