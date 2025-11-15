'use client';

import React, { useState, useMemo } from 'react';
import { useDataContext } from '@/components/providers/DataProvider';
import { useDataStream } from '@/hooks/useDataStream';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import { DataTable } from '@/components/ui/DataTable';
import { FilterPanel } from '@/components/controls/FilterPanel';
import { TimeRangeSelector } from '@/components/controls/TimeRangeSelector';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { ScatterPlot } from '@/components/charts/ScatterPlot';
import { Heatmap } from '@/components/charts/Heatmap';
import { ChartType, TimeRange } from '@/lib/types';

export default function DashboardPage() {
  const { initialData } = useDataContext();
  const [activeChart, setActiveChart] = useState<ChartType>('line');
  const [isStreaming, setIsStreaming] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const { metrics, recordFrame } = usePerformanceMonitor();
  const { data } = useDataStream(initialData, isStreaming);

  const filteredData = useMemo(() => {
    if (timeRange === 'all') return data;
    const now = Date.now();
    const ranges: { [key in TimeRange]: number } = { 
      '1m': 60000, 
      '5m': 300000, 
      '1h': 3600000,
      'all': 0 
    };
    const cutoff = now - (ranges[timeRange] || 0);
    return data.filter((d: any) => d.timestamp >= cutoff);
  }, [data, timeRange]);

  const chartDimensions = { width: 1000, height: 500 };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Real-Time Performance Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            High-performance visualization with 10,000+ data points @ 60fps
          </p>
        </div>

        {/* Performance Metrics */}
        <PerformanceMonitor metrics={metrics} isStreaming={isStreaming} />

        {/* Controls Section */}
        <div className="glass-dark rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-4">Chart Type</h3>
              <FilterPanel activeChart={activeChart} onChartChange={setActiveChart} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Time Range</h3>
                <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-4">Stream Control</h3>
                <button
                  onClick={() => setIsStreaming(!isStreaming)}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                    isStreaming
                      ? 'btn-primary text-white'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                  }`}
                >
                  {isStreaming ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full pulse-live" />
                      Stop Streaming
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Start Streaming
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="glass-dark rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              {activeChart.charAt(0).toUpperCase() + activeChart.slice(1)} Chart
            </h3>
            <div className="text-sm text-gray-400">
              Displaying {filteredData.length.toLocaleString()} data points
            </div>
          </div>
          <div className="flex justify-center bg-black/30 rounded-xl p-4">
            {activeChart === 'line' && (
              <LineChart data={filteredData} dimensions={chartDimensions} />
            )}
            {activeChart === 'bar' && (
              <BarChart data={filteredData} dimensions={chartDimensions} />
            )}
            {activeChart === 'scatter' && (
              <ScatterPlot data={filteredData} dimensions={chartDimensions} />
            )}
            {activeChart === 'heatmap' && (
              <Heatmap data={filteredData} dimensions={chartDimensions} />
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="glass-dark rounded-2xl p-6">
          <DataTable data={data} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400">
          <p className="text-sm">
            Built with Next.js 14 + React + Canvas • Real-time updates every 100ms
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Performance optimized for 10,000+ data points @ 60 FPS
          </p>
        </div>
      </div>
    </div>
  );
}