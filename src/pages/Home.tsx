import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Copy, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import ResultItem from '../components/ResultItem';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { vinSchema, type VinFormData } from '../schemas/vin';
import { decodeVin } from '../services/api';
import type { DecodeResponse } from '../services/api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

const Home = () => {
  const [recentVins, setRecentVins] = useLocalStorage<string[]>('recentVins', []);
  const copyToClipboard = useCopyToClipboard();
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue, setError } = useForm<VinFormData>({
    resolver: zodResolver(vinSchema),
    mode: 'onBlur',
    defaultValues: { vin: '' }
  });

  const vin = watch('vin');

  const { data, isLoading, error, refetch } = useQuery<DecodeResponse>({
    queryKey: ['vin', vin],
    queryFn: () => decodeVin(vin),
    enabled: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const onSubmit = async (formData: VinFormData) => {
    const result = await refetch();

    if (result.isSuccess && result.data && !result.error) {
      setRecentVins(prev => {
        const newList = [formData.vin, ...prev.filter(v => v !== formData.vin)].slice(0, 3);
        return newList;
      });
    }
  };

  const handleRecentClick = useCallback(async (selectedVin: string) => {
    setValue('vin', selectedVin);

    try {
      await queryClient.fetchQuery({
        queryKey: ['vin', selectedVin],
        queryFn: () => decodeVin(selectedVin),
        staleTime: 1000 * 60 * 10,
      });
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : 'Failed to fetch VIN details';
      setError('vin', { type: 'manual', message });
      console.error('handleRecentClick fetchQuery failed', fetchError);
    }
  }, [setValue, setError, queryClient]);

  const filteredResults = data?.Results.filter(r => r.Value) || [];
  const make = filteredResults.find(r => r.Variable === 'Make')?.Value;
  const model = filteredResults.find(r => r.Variable === 'Model')?.Value;
  const year = filteredResults.find(r => r.Variable === 'Model Year')?.Value;
  const otherResults = filteredResults.filter(r => !['Make', 'Model', 'Model Year'].includes(r.Variable));

  return (
    <div className="container">
      <Header />
      
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="hero-title">VIN Decoder</h1>
        <p className="hero-subtitle">
          Decode any vehicle identification number instantly and get comprehensive vehicle information.
        </p>
      </motion.div>

      <Card animate>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Search size={20} style={{ color: 'var(--primary-color)' }} />
          <h2 className="section-title" style={{ margin: 0 }}>Decode Your VIN</h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('vin')}
            label="Vehicle Identification Number"
            placeholder="Enter 17-character VIN"
            error={errors.vin?.message}
          />
          
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <Button type="submit" isLoading={isLoading}>
              {isLoading ? 'Decoding...' : 'Decode VIN'}
            </Button>
            {vin && (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => copyToClipboard(vin)}
              >
                <Copy size={18} style={{ marginRight: '0.5rem' }} />
                Copy
              </Button>
            )}
          </div>
        </form>
      </Card>

      {!vin && !data && !isLoading && (
        <EmptyState
          icon="🚗"
          title="Enter a VIN to get started"
          description="Provide a 17-character Vehicle Identification Number to decode vehicle information including make, model, year, and more."
        />
      )}

      {isLoading && <Loader />}

      {error && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          ⚠️ Failed to decode VIN. Please check your input and try again.
        </motion.div>
      )}

      {data && data.Results && (
        <>
          {data.Message && !data.Message.includes('SUCCESS') && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {data.Message}
            </motion.div>
          )}

          {(make || model || year) && (
            <Card animate>
              <h3 style={{ marginTop: 0 }}>Highlighted Information</h3>
              <div className="key-info">
                {make && (
                  <motion.div
                    className="key-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0 }}
                  >
                    <strong>Make</strong>
                    <div>{make}</div>
                  </motion.div>
                )}
                {model && (
                  <motion.div
                    className="key-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <strong>Model</strong>
                    <div>{model}</div>
                  </motion.div>
                )}
                {year && (
                  <motion.div
                    className="key-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <strong>Year</strong>
                    <div>{year}</div>
                  </motion.div>
                )}
              </div>
            </Card>
          )}

          {otherResults.length > 0 && (
            <Card animate>
              <h3 style={{ marginTop: 0 }}>Additional Details</h3>
              {otherResults.map((result, index) => (
                <ResultItem 
                  key={result.VariableId || result.Variable}
                  label={result.Variable}
                  value={result.Value}
                  index={index}
                />
              ))}
            </Card>
          )}

          {filteredResults.length === 0 && (
            <EmptyState
              icon="🔍"
              title="No Data Found"
              description="The VIN was recognized but no additional data could be retrieved. The VIN may be incomplete or invalid."
            />
          )}
        </>
      )}

      {recentVins.length > 0 && (
        <Card animate>
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🕒</span> Recent Searches
          </h3>
          <div className="pills">
            {recentVins.map((v) => (
              <motion.button
                key={v}
                className="pill"
                onClick={() => handleRecentClick(v)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {v}
              </motion.button>
            ))}
          </div>
        </Card>
      )}

      <Footer extra={<> • Built with React & TypeScript • <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>View Source</a></>} />
    </div>
  );
};

export default Home;