import { Navigate, useLocation } from 'react-router-dom';

/**
 * Blocks access to protected routes if no valid token exists.
 * Redirects to /admin with the attempted URL saved so user
 * can be sent back after login.
 */
export default function PrivateRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('adminToken');

  if (!token) {
    // Redirect to login, remember where they were trying to go
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  // Basic JWT expiry check (without making a network request)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      // Token expired — clear storage and redirect
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      return <Navigate to="/admin" state={{ from: location }} replace />;
    }
  } catch {
    // Malformed token — clear and redirect
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    return <Navigate to="/admin" replace />;
  }

  return children;
}
