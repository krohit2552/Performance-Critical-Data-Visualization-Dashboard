import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DataProvider } from '@/components/providers/DataProvider';
import { generateInitialDataset } from '@/lib/dataGenerator';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Performance Dashboard',
  description: 'High-performance real-time data visualization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = generateInitialDataset(10000);

  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider initialData={initialData}>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
            {children}
          </div>
        </DataProvider>
      </body>
    </html>
  );
}