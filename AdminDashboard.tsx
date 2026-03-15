import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  recentSearches: string[];
  savedResources: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addRecentSearch: (search: string) => void;
  toggleSavedResource: (resourceId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("emergencyApp_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("emergencyApp_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock authentication - in real app, validate against backend
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Create mock user
    const mockUser: User = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0],
      email,
      isAdmin: email === "admin@emergency.com", // Demo: admin account
      recentSearches: [],
      savedResources: [],
    };

    setUser(mockUser);
    localStorage.setItem("emergencyApp_user", JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Validation
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Create new user
    const newUser: User = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      isAdmin: false,
      recentSearches: [],
      savedResources: [],
    };

    setUser(newUser);
    localStorage.setItem("emergencyApp_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("emergencyApp_user");
  };

  const addRecentSearch = (search: string) => {
    if (!user) return;

    const updated = {
      ...user,
      recentSearches: [search, ...user.recentSearches.filter((s) => s !== search)].slice(
        0,
        5
      ),
    };
    setUser(updated);
    localStorage.setItem("emergencyApp_user", JSON.stringify(updated));
  };

  const toggleSavedResource = (resourceId: string) => {
    if (!user) return;

    const updated = {
      ...user,
      savedResources: user.savedResources.includes(resourceId)
        ? user.savedResources.filter((id) => id !== resourceId)
        : [...user.savedResources, resourceId],
    };
    setUser(updated);
    localStorage.setItem("emergencyApp_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        addRecentSearch,
        toggleSavedResource,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
