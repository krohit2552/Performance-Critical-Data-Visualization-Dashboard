'use client';

import React, { memo, useMemo } from 'react';
import { DataPoint, ChartDimensions } from '@/lib/types';
import { useChartRenderer } from '@/hooks/useChartRenderer';
import { clearCanvas, normalizeData } from '@/lib/canvasUtils';

interface ScatterPlotProps {
  data: DataPoint[];
  dimensions: ChartDimensions;
}

export const ScatterPlot = memo<ScatterPlotProps>(({ data, dimensions }) => {
  const processedData = useMemo(() => {
    const sampled = data.filter((_, i) => i % 10 === 0);
    return normalizeData(sampled, dimensions);
  }, [data, dimensions]);

  const canvasRef = useChartRenderer(
    (ctx) => {
      clearCanvas(ctx, dimensions.width, dimensions.height);

      const colors = ['#00d4ff', '#ff006e', '#8338ec', '#06ffa5', '#ffbe0b'];

      processedData.forEach(point => {
        const colorIndex = parseInt(point.category.replace('cat', ''));
        ctx.fillStyle = colors[colorIndex % colors.length];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    },
    [processedData, dimensions]
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

ScatterPlot.displayName = 'ScatterPlot';
