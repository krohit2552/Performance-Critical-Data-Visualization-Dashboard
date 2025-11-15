'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { DataPoint } from '@/lib/types';

interface DataContextType {
  initialData: DataPoint[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({
  children,
  initialData
}: {
  children: ReactNode;
  initialData: DataPoint[];
}) => {
  return (
    <DataContext.Provider value={{ initialData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within DataProvider');
  }
  return context;
};
