import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

// Redirects already-logged-in admins away from the login page
function PublicAdminRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 > Date.now()) {
        return <Navigate to="/admin/dashboard" replace />;
      }
    } catch {
      // Invalid token — let them through to login
    }
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Login: if already logged in → go to dashboard */}
      <Route
        path="/admin"
        element={
          <PublicAdminRoute>
            <AdminLogin />
          </PublicAdminRoute>
        }
      />

      {/* Dashboard: must be logged in, else → go to login */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* Catch-all: unknown URLs → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

