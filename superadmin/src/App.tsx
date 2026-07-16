import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/useAuthStore';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Users from './pages/Users';
import Payouts from './pages/Payouts';
import Settings from './pages/Settings';
import Categories from './pages/Categories';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  if (!token) return <Navigate to="/login" replace />;
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-zinc-700 flex flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600">ProAcademy</h2>
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Superadmin</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <Link to="/dashboard" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700">📊 Dashboard</Link>
          <Link to="/courses" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700">📚 Kurslar</Link>
          <Link to="/users" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700">👥 Foydalanuvchilar</Link>
          <Link to="/categories" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700">📂 Kategoriyalar</Link>
          <Link to="/payouts" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700">💸 To'lovlar (Payouts)</Link>
          <Link to="/settings" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700">⚙️ Sozlamalar</Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-zinc-700">
          <button 
            onClick={() => useAuthStore.getState().logout()}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
          >
            🚪 Chiqish
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/payouts" element={<ProtectedRoute><Payouts /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
