'use client';

import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { SearchProvider } from './contexts/SearchContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  }));

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <SearchProvider>
            {children}
          </SearchProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
