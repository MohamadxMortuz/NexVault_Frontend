import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PublicNavbar from './components/PublicNavbar';
import PublicFooter from './components/PublicFooter';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Upload from './pages/Upload';
import Download from './pages/Download';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" replace />;
}

/* Public pages with PublicNavbar + PublicFooter */
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      <PublicNavbar />
      <main className="flex-1 pt-16">{children}</main>
      <PublicFooter />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout><Homepage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          {/* Protected routes — same PublicLayout, no sidebar */}
          <Route path="/upload" element={<ProtectedRoute><PublicLayout><Upload /></PublicLayout></ProtectedRoute>} />
          <Route path="/download" element={<ProtectedRoute><PublicLayout><Download /></PublicLayout></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><PublicLayout><Contact /></PublicLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><PublicLayout><Profile /></PublicLayout></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
