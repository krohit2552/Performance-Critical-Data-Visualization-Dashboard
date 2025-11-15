export interface DataPoint {
  timestamp: number;
  value: number;
  category: string;
}

export interface PerformanceMetrics {
  fps: number;
  renderTime: number;
  dataPoints: number;
  memoryUsage?: number;
}

export interface ChartDimensions {
  width: number;
  height: number;
}

export type ChartType = 'line' | 'bar' | 'scatter' | 'heatmap';
export type TimeRange = 'all' | '1m' | '5m' | '1h';
