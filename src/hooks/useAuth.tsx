import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check session on mount
    const storedUser = sessionStorage.getItem('portfolio_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple Admin Credentials
    if (email.toLowerCase() === 'admin@portfolio.com' && password === 'password') {
      const adminUser: User = {
        id: 'admin-1',
        email: 'admin@portfolio.com',
        name: 'Administrator'
      };
      setUser(adminUser);
      sessionStorage.setItem('portfolio_session', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    } else {
      setError('Email atau password salah. Silakan coba lagi.');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('portfolio_session');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
