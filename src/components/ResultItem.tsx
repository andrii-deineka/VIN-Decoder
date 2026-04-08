import React from 'react';
import { motion } from 'framer-motion';

interface ResultItemProps {
  label: string;
  value: string;
  index?: number;
}

const ResultItem: React.FC<ResultItemProps> = ({ label, value, index = 0 }) => {
  return (
    <motion.div
      className="result-item"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <span className="result-label">{label}:</span>
      <span className="result-value">{value}</span>
    </motion.div>
  );
};

export default ResultItem;