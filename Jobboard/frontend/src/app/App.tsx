import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </JobProvider>
    </AuthProvider>
  );
}