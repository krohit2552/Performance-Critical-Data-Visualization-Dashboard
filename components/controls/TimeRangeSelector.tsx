'use client';

import React from 'react';
import { TimeRange } from '@/lib/types';

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  value,
  onChange
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TimeRange)}
      className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 hover:bg-gray-600 transition text-white"
    >
      <option value="all">All Time</option>
      <option value="1m">Last 1 Min</option>
      <option value="5m">Last 5 Min</option>
      <option value="1h">Last 1 Hour</option>
    </select>
  );
};