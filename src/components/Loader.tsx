import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="spinner" />
      <p className="loader-text">Decoding VIN...</p>
    </motion.div>
  );
};

export default Loader;