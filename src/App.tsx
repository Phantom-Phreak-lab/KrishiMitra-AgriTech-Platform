import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { BottomNav } from '@/components/layout/bottom-nav';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { AuthProvider } from '@/components/auth/auth-provider';

// Pages
import { HomePage } from '@/pages/home';
import { DiagnosePage } from '@/pages/diagnose';
import { MarketplacePage } from '@/pages/marketplace';
import { CreateListingPage } from '@/pages/listing/new';
import { ChatPage } from '@/pages/chat';
import { AdminPage } from '@/pages/admin';
import { ProfilePage } from '@/pages/profile';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';

import './i18n';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="krishimitra-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pb-20 md:pb-4">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } />
                <Route path="/diagnose" element={
                  <ProtectedRoute>
                    <DiagnosePage />
                  </ProtectedRoute>
                } />
                <Route path="/marketplace" element={
                  <ProtectedRoute>
                    <MarketplacePage />
                  </ProtectedRoute>
                } />
                <Route path="/listing/new" element={
                  <ProtectedRoute>
                    <CreateListingPage />
                  </ProtectedRoute>
                } />
                <Route path="/chat/:conversationId?" element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <BottomNav />
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;