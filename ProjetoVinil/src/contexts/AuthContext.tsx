import React, { createContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  birthDate: string;
  avatar?: string;
  bio?: string;
  gender?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, birthDate: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfile: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('vinilbox_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // For demo purposes, we'll create a mock user if credentials match a pattern
      if (email && password.length >= 6) {
        const mockUser = {
          id: `user_${Math.random().toString(36).substr(2, 9)}`,
          email,
          name: email.split('@')[0],
          birthDate: '1990-01-01',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };
        
        setCurrentUser(mockUser);
        localStorage.setItem('vinilbox_user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, name: string, birthDate: string, password: string) => {
    // Mock signup - in a real app, this would call an API
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (email && name && birthDate && password.length >= 6) {
        const mockUser = {
          id: `user_${Math.random().toString(36).substr(2, 9)}`,
          email,
          name,
          birthDate,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };
        
        setCurrentUser(mockUser);
        localStorage.setItem('vinilbox_user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('vinilbox_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      localStorage.setItem('vinilbox_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    currentUser,
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};