'use client';

import { useState, useEffect, useCallback } from 'react';
import { DataPoint } from '@/lib/types';
import { generateDataPoint } from '@/lib/dataGenerator';

export const useDataStream = (
  initialData: DataPoint[],
  isStreaming: boolean,
  interval: number = 100
) => {
  const [data, setData] = useState<DataPoint[]>(initialData);
  const [dataIndex, setDataIndex] = useState(initialData.length);

  useEffect(() => {
    if (!isStreaming) return;

    const streamInterval = setInterval(() => {
      setData(prev => {
        const newPoint = generateDataPoint(dataIndex);
        const updated = [...prev.slice(-9999), newPoint];
        return updated;
      });
      setDataIndex(prev => prev + 1);
    }, interval);

    return () => clearInterval(streamInterval);
  }, [isStreaming, interval, dataIndex]);

  const reset = useCallback(() => {
    setData(initialData);
    setDataIndex(initialData.length);
  }, [initialData]);

  return { data, reset };
};
