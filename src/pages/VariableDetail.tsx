import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import type { VariablesResponse } from '../services/api';
import { getVariables } from '../services/api';

const VariableDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery<VariablesResponse>({
    queryKey: ['variables'],
    queryFn: () => getVariables(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const variable = data?.Results.find(v => v.ID === Number(id));

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
        title="Error Loading Variable"
        description="Failed to load variable details. Please try again later."
      />
      <Footer />
    </div>
  );

  if (!variable) return (
    <div className="container">
      <Header />
      <EmptyState
        icon="🔍"
        title="Variable Not Found"
        description="The requested variable could not be found."
        action={<Link to="/variables" className="btn btn-secondary">← Back to Variables</Link>}
      />
      <Footer />
    </div>
  );

  return (
    <div className="container">
      <Header />
      <Card animate>
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '1rem' }}
        >
          {variable.Name}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ marginBottom: 'var(--spacing-lg)' }}
        >
          <span className="muted-text">Variable ID: {variable.ID}</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{ lineHeight: '1.7', fontSize: '1rem', marginBottom: 'var(--spacing-lg)' }}
        >
          {variable.Description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link to="/variables" className="btn btn-secondary">← Back to Variables</Link>
        </motion.div>
      </Card>
      <Footer />
    </div>
  );
};

export default VariableDetail;