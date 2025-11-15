import { DataPoint, ChartDimensions } from './types';

export const createCanvasContext = (
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D | null => {
  return canvas.getContext('2d', { alpha: false });
};

export const clearCanvas = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string = '#1a1a2e'
): void => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
};

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  divisions: number = 5
): void => {
  ctx.strokeStyle = '#2a2a3e';
  ctx.lineWidth = 1;
  
  for (let i = 0; i <= divisions; i++) {
    const y = (i / divisions) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
};

export const normalizeData = (
  data: DataPoint[],
  dimensions: ChartDimensions
): { x: number; y: number; category: string }[] => {
  if (data.length === 0) return [];
  
  const values = data.map(d => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;
  
  return data.map((d, i) => ({
    x: (i / (data.length - 1)) * dimensions.width,
    y: dimensions.height - ((d.value - minVal) / range) * dimensions.height,
    category: d.category
  }));
};