import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, animate = false }) => {
  const content = <div className={clsx('card', className)}>{children}</div>;

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.div>
  );
};

export default Card;