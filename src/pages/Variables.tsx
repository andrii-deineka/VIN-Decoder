import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import type { VariablesResponse } from '../services/api';
import { getVariables } from '../services/api';

const Variables = () => {
  const { data, isLoading, error } = useQuery<VariablesResponse>({
    queryKey: ['variables'],
    queryFn: () => getVariables(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) return (
    <div className="container">
      <Header />
      <Loader />
    </div>
  );

  if (error) return (
    <div className="container">
      <Header />
      <EmptyState
        icon="⚠️"
        title="Error Loading Variables"
        description="Failed to load vehicle variables. Please try again later."
      />
      <Footer />
    </div>
  );

  return (
    <div className="container">
      <Header />
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📋 Vehicle Variables
      </motion.h1>
      <Card animate>
        <p className="muted-text" style={{ marginBottom: 'var(--spacing-lg)' }}>
          Explore all available vehicle variables used in VIN decoding. Click any variable to view its detailed description.
        </p>
        <ul className="list">
          {data?.Results.map((variable, index) => (
            <motion.li 
              key={variable.ID} 
              className="list-item"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              whileHover={{ x: 4 }}
            >
              <Link to={`/variables/${variable.ID}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <strong>{variable.ID}</strong> - {variable.Name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </Card>
      <Footer />
    </div>
  );
};

export default Variables;