'use client';

import React, { memo, useMemo } from 'react';
import { DataPoint, ChartDimensions } from '@/lib/types';
import { useChartRenderer } from '@/hooks/useChartRenderer';
import { clearCanvas } from '@/lib/canvasUtils';

interface HeatmapProps {
  data: DataPoint[];
  dimensions: ChartDimensions;
}

export const Heatmap = memo<HeatmapProps>(({ data, dimensions }) => {
  const heatmapData = useMemo(() => {
    const gridSize = 30;
    const cellWidth = dimensions.width / gridSize;
    const cellHeight = dimensions.height / gridSize;
    const grid = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));

    data.forEach((d, i) => {
      const x = Math.floor(i % gridSize);
      const y = Math.floor(i / gridSize) % gridSize;
      grid[y][x] = d.value;
    });

    const maxVal = Math.max(...data.map(d => d.value));
    return { grid, cellWidth, cellHeight, maxVal };
  }, [data, dimensions]);

  const canvasRef = useChartRenderer(
    (ctx) => {
      clearCanvas(ctx, dimensions.width, dimensions.height);

      const { grid, cellWidth, cellHeight, maxVal } = heatmapData;

      grid.forEach((row, y) => {
        row.forEach((value, x) => {
          const intensity = value / maxVal;
          const r = Math.floor(intensity * 255);
          const b = Math.floor((1 - intensity) * 255);
          ctx.fillStyle = `rgb(${r}, 100, ${b})`;
          ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
        });
      });
    },
    [heatmapData, dimensions]
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

Heatmap.displayName = 'Heatmap';
