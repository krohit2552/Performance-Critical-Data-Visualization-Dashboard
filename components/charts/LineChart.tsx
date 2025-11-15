'use client';

import React, { memo, useRef, useEffect, useMemo } from 'react';
import { DataPoint, ChartDimensions } from '@/lib/types';

interface LineChartProps {
  data: DataPoint[];
  dimensions: ChartDimensions;
}

export const LineChart = memo<LineChartProps>(({ data, dimensions }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const processedData = useMemo(() => {
    if (data.length === 0) return { points: [], minVal: 0, maxVal: 100 };
    
    const values = data.map(d => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    
    return { 
      points: data.map((d, i) => ({
        x: (i / (data.length - 1)) * dimensions.width,
        y: dimensions.height - ((d.value - minVal) / (maxVal - minVal || 1)) * dimensions.height
      })),
      minVal,
      maxVal
    };
  }, [data, dimensions.width, dimensions.height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = () => {
      // Clear with glass effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.8)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Grid with subtle styling
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = (i / 5) * dimensions.height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // Line with gradient
      if (processedData.points.length > 1) {
        // Create gradient for the line
        const gradient = ctx.createLinearGradient(0, 0, dimensions.width, 0);
        gradient.addColorStop(0, '#00d4ff');
        gradient.addColorStop(0.5, '#8338ec');
        gradient.addColorStop(1, '#ff006e');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(processedData.points[0].x, processedData.points[0].y);
        
        for (let i = 1; i < processedData.points.length; i++) {
          ctx.lineTo(processedData.points[i].x, processedData.points[i].y);
        }
        ctx.stroke();

        // Fill area with gradient
        const fillGradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
        fillGradient.addColorStop(0, 'rgba(0, 212, 255, 0.2)');
        fillGradient.addColorStop(1, 'rgba(131, 56, 236, 0.05)');
        
        ctx.fillStyle = fillGradient;
        ctx.lineTo(dimensions.width, dimensions.height);
        ctx.lineTo(0, dimensions.height);
        ctx.closePath();
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [processedData, dimensions.width, dimensions.height]);

  return (
    <canvas 
      ref={canvasRef} 
      width={dimensions.width} 
      height={dimensions.height} 
      className="rounded-xl shadow-2xl"
    />
  );
});

LineChart.displayName = 'LineChart';