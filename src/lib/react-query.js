// lib/react-query.js
"use client"
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
