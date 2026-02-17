
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WatchProgressProvider } from './context/WatchProgressContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Watch from './pages/Watch';
import ContentDetails from './pages/ContentDetails';
import ProfileSelection from './pages/ProfileSelection';
import ProfileManagement from './pages/ProfileManagement';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Subscription from './pages/Subscription';
import ViewingHistory from './pages/ViewingHistory';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUpload from './pages/Admin/Upload';
import AdminUsers from './pages/Admin/Users';
import NotFound from './pages/NotFound';
import SplashScreen from './components/SplashScreen';


const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, profile, loading } = useAuth();

  // Demo mode - allow access if Supabase is not configured
  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_URL !== 'https://your-project.supabase.co';

  if (!isSupabaseConfigured) {
    // In demo mode, bypass auth for non-admin routes
    if (requireAdmin) {
      return <div className="h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Demo Mode</h2>
          <p className="text-gray-400">Admin panel requires Supabase configuration.</p>
          <p className="text-sm text-gray-500 mt-2">Please set up your .env file with valid credentials.</p>
        </div>
      </div>;
    }
    return children;
  }

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-accent">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !profile?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Check if Supabase is configured
  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_URL !== 'https://your-project.supabase.co';

  // Skip splash in demo mode
  if (showSplash && isSupabaseConfigured) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <AuthProvider>
      <WatchProgressProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/profiles"
              element={
                <ProtectedRoute>
                  <ProfileSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-profiles"
              element={
                <ProtectedRoute>
                  <ProfileManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/watch/:id"
              element={
                <ProtectedRoute>
                  <Watch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/title/:id"
              element={
                <ProtectedRoute>
                  <ContentDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/list"
              element={
                <ProtectedRoute>
                  <Watchlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscription"
              element={
                <ProtectedRoute>
                  <Subscription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <ViewingHistory />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="upload" element={<AdminUpload />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </WatchProgressProvider>
    </AuthProvider>
  );
}

export default App;
