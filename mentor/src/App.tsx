import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/useAuthStore';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateCourse from './pages/CreateCourse';

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
                <div className="flex gap-4 mt-4">
                  <Link to="/courses/new" className="px-4 py-2 bg-blue-600 text-white rounded-md">Yangi Kurs Yaratish</Link>
                  <button 
                    onClick={() => useAuthStore.getState().logout()}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    Chiqish
                  </button>
                </div>
              </div>
            </ProtectedRoute>
          } />

          <Route path="/courses/new" element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
