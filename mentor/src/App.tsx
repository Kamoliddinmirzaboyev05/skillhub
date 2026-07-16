import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/useAuthStore';
import Login from './pages/Login';
import Register from './pages/Register';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div className="p-8">
                <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
                <h2 className="text-xl">Xush kelibsiz, {user?.fullName}</h2>
                <p className="mt-2 text-gray-600">Rol: {user?.role}</p>
                <button 
                  onClick={() => useAuthStore.getState().logout()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Chiqish
                </button>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
