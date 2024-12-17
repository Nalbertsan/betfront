import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ServerProvider } from './context/ServerProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.tsx'
import { AuthProvider } from './context/AuthContext.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ServerProvider>
          <RouterProvider router={router}/> 
        </ServerProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
