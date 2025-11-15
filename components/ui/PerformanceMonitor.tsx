'use client';

import React from 'react';
import { PerformanceMetrics } from '@/lib/types';

interface PerformanceMonitorProps {
  metrics: PerformanceMetrics;
  isStreaming: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  metrics,
  isStreaming
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-800/50 backdrop-blur rounded-lg p-4 border border-cyan-500/20">
        <div className="text-sm text-gray-400 mb-1">FPS</div>
        <div className="text-2xl font-bold text-cyan-400">{metrics.fps}</div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur rounded-lg p-4 border border-purple-500/20">
        <div className="text-sm text-gray-400 mb-1">Render Time</div>
        <div className="text-2xl font-bold text-purple-400">
          {metrics.renderTime.toFixed(2)}ms
        </div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur rounded-lg p-4 border border-pink-500/20">
        <div className="text-sm text-gray-400 mb-1">Data Points</div>
        <div className="text-2xl font-bold text-pink-400">
          {metrics.dataPoints.toLocaleString()}
        </div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur rounded-lg p-4 border border-green-500/20">
        <div className="text-sm text-gray-400 mb-1">Status</div>
        <div className="text-2xl font-bold text-green-400">
          {isStreaming ? 'Live' : 'Paused'}
        </div>
      </div>
    </div>
  );
};
