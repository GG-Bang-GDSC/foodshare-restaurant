import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import { QueryClientProvider, useQueryClient } from 'react-query';
// import '@asseinfo/react-kanban/dist/styles.css';
// import '/public/styles/Plugins.css';
import { ReactQueryProvider } from './../lib/react-query';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
        <ReactQueryProvider>
        <AppWrappers>{children}</AppWrappers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
