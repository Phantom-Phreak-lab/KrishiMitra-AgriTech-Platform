import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { authService } from '@/services/auth-service';

interface AuthContextType {
  // Add any auth-specific methods here if needed
}

const AuthContext = createContext<AuthContextType>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, setLoading, login, logout } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          setLoading(true);
          const user = await authService.me();
          login(user, token);
        } catch (error) {
          logout();
        } finally {
          setLoading(false);
        }
      }
    };

    initAuth();
  }, [token, setLoading, login, logout]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);