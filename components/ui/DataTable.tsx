'use client';

import React from 'react';
import { DataPoint } from '@/lib/types';
import { useVirtualization } from '@/hooks/useVirtualization';

interface DataTableProps {
  data: DataPoint[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const containerHeight = 400;
  const itemHeight = 40;
  
  const { visibleItems, offsetY, setScrollTop, totalHeight } = useVirtualization(
    data.slice(-100), // Show last 100 items
    itemHeight,
    containerHeight
  );

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold">Recent Data (Last 100)</h3>
      </div>
      <div
        className="overflow-auto"
        style={{ height: containerHeight }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            {visibleItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 border-b border-gray-700/50 hover:bg-gray-700/30"
                style={{ height: itemHeight }}
              >
                <div className="flex-1 text-sm text-gray-300">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </div>
                <div className="flex-1 text-sm font-mono text-cyan-400">
                  {item.value.toFixed(2)}
                </div>
                <div className="flex-1 text-sm text-purple-400">
                  {item.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
