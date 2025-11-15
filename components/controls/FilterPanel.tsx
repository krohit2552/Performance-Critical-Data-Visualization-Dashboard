'use client';

import React from 'react';
import { ChartType } from '@/lib/types';
import { Activity, BarChart3, Circle, Square } from 'lucide-react'; 
interface FilterPanelProps {
  activeChart: ChartType;
  onChartChange: (chart: ChartType) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  activeChart,
  onChartChange
}) => {
  const charts: { type: ChartType; icon: React.ReactNode; label: string; color: string }[] = [
    { type: 'line', icon: <Activity size={18} />, label: 'Line', color: 'cyan' },
    { type: 'bar', icon: <BarChart3 size={18} />, label: 'Bar', color: 'purple' },
    { type: 'scatter', icon: <Circle size={18} />, label: 'Scatter', color: 'pink' },
    { type: 'heatmap', icon: <Square size={18} />, label: 'Heatmap', color: 'orange' }
  ];

  return (
    <div className="flex gap-2">
      {charts.map(({ type, icon, label, color }) => (
        <button
          key={type}
          onClick={() => onChartChange(type)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
            activeChart === type
              ? `bg-${color}-500 text-white`
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
};