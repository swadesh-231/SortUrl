import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <AuthProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#27272a',
            color: '#f4f4f5',
            border: '1px solid #3f3f46',
            borderRadius: '12px',
            fontSize: '13px',
          },
          success: { iconTheme: { primary: '#22c55e', secondary: '#27272a' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#27272a' } },
        }}
      />
    </BrowserRouter>
  </AuthProvider>
);

export default App;