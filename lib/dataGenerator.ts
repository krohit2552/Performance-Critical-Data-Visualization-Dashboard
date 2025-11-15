import { DataPoint } from './types';

export const generateInitialDataset = (count: number = 10000): DataPoint[] => {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => ({
    timestamp: now - (count - i) * 100,
    value: Math.sin(i / 100) * 50 + Math.random() * 20 + 100,
    category: `cat${i % 5}`
  }));
};

export const generateDataPoint = (index: number): DataPoint => ({
  timestamp: Date.now(),
  value: Math.sin(index / 100) * 50 + Math.random() * 20 + 100,
  category: `cat${index % 5}`
});

export const aggregateData = (data: DataPoint[], buckets: number): number[] => {
  const bucketSize = Math.ceil(data.length / buckets);
  const result = [];
  
  for (let i = 0; i < buckets && i * bucketSize < data.length; i++) {
    const slice = data.slice(i * bucketSize, (i + 1) * bucketSize);
    const avg = slice.reduce((sum, d) => sum + d.value, 0) / slice.length;
    result.push(avg);
  }
  
  return result;
};