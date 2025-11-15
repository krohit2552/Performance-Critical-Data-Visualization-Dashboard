'use client';

import React, { memo, useMemo } from 'react';
import { DataPoint, ChartDimensions } from '@/lib/types';
import { useChartRenderer } from '@/hooks/useChartRenderer';
import { clearCanvas } from '@/lib/canvasUtils';
import { aggregateData } from '@/lib/dataGenerator';

interface BarChartProps {
  data: DataPoint[];
  dimensions: ChartDimensions;
}

export const BarChart = memo<BarChartProps>(({ data, dimensions }) => {
  const aggregated = useMemo(() => {
    const buckets = 50;
    const values = aggregateData(data, buckets);
    const maxVal = Math.max(...values);
    return values.map(v => v / maxVal);
  }, [data]);

  const canvasRef = useChartRenderer(
    (ctx) => {
      clearCanvas(ctx, dimensions.width, dimensions.height);

      const barWidth = dimensions.width / aggregated.length;

      aggregated.forEach((value, i) => {
        const barHeight = value * dimensions.height;
        const x = i * barWidth;
        const y = dimensions.height - barHeight;

        const gradient = ctx.createLinearGradient(0, y, 0, dimensions.height);
        gradient.addColorStop(0, '#ff006e');
        gradient.addColorStop(1, '#8338ec');

        ctx.fillStyle = gradient;
        ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
      });
    },
    [aggregated, dimensions]
  );

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="rounded-lg"
    />
  );
});

BarChart.displayName = 'BarChart';