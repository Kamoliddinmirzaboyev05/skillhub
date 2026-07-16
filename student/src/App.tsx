import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/useAuthStore';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import CourseDetail from './pages/CourseDetail';
import Classroom from './pages/Classroom';
import Quiz from './pages/Quiz';
import Certificate from './pages/Certificate';

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
          
          <Route path="/" element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          } />

          <Route path="/courses/:id" element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          } />

          <Route path="/learn/:id" element={
            <ProtectedRoute>
              <Classroom />
            </ProtectedRoute>
          } />

          <Route path="/quiz/:id" element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          } />

          <Route path="/certificate/:verifyId" element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
