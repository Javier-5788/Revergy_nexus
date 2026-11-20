import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthUser } from "../types/auth.types";

const TOKEN_KEY = "nexus_token";
const USER_KEY = "nexus_user";

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (newToken: string, userData?: AuthUser | null) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getInitialUser(): AuthUser | null {
  const raw = sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    sessionStorage.removeItem(USER_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem(TOKEN_KEY),
  );
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);

  const signIn = (newToken: string, userData: AuthUser | null = null) => {
    sessionStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);

    if (userData) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}