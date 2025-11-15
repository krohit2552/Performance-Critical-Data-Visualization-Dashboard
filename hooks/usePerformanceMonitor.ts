'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PerformanceMetrics } from '@/lib/types';

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    renderTime: 0,
    dataPoints: 0
  });
  
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTime.current;
      const fps = Math.round((frameCount.current * 1000) / elapsed);
      
      setMetrics(prev => ({ ...prev, fps }));
      frameCount.current = 0;
      lastTime.current = now;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const recordFrame = useCallback((renderTime: number, dataPoints: number) => {
    frameCount.current++;
    setMetrics(prev => ({ ...prev, renderTime, dataPoints }));
  }, []);

  return { metrics, recordFrame };
};