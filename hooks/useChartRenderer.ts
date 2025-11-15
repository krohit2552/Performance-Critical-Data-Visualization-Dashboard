'use client';

import { useEffect, useRef } from 'react';

export const useChartRenderer = (
  renderFn: (ctx: CanvasRenderingContext2D) => void,
  dependencies: any[]
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const animate = () => {
      renderFn(ctx);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, dependencies);

  return canvasRef;
};