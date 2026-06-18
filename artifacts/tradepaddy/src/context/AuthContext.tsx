import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchMe, disconnectBitget, type AuthState } from "@/lib/auth";

interface AuthContextValue extends AuthState {
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  connected: false,
  uid: null,
  username: null,
  userId: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ connected: false, uid: null, username: null, userId: null });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const me = await fetchMe();
      setState(me);
    } catch {
      setState({ connected: false, uid: null, username: null, userId: null });
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await disconnectBitget();
    setState({ connected: false, uid: null, username: null, userId: null });
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ ...state, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
