import { NextResponse } from 'next/server';
import { generateInitialDataset } from '@/lib/dataGenerator';

export async function GET() {
  const data = generateInitialDataset(10000);
  return NextResponse.json({ data });
}