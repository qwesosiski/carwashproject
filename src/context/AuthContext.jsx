import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const ACCESS_KEY  = 'aquashine_access';
const REFRESH_KEY = 'aquashine_refresh';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Восстановление сессии при старте
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    api.me(token)
      .then((u) => setUser(u))
      .catch(() => {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  const register = useCallback(async (payload) => {
    // payload: { username, email, phone, password }
    await api.register(payload);
    const { access, refresh } = await api.login(payload.username, payload.password);
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
    const me = await api.me(access);
    setUser(me);
    return me;
  }, []);

  const login = useCallback(async (username, password) => {
    const { access, refresh } = await api.login(username, password);
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
    const me = await api.me(access);
    setUser(me);
    return me;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const token = localStorage.getItem(ACCESS_KEY);
    const updated = await api.updateProfile(payload, token);
    setUser(updated);
    return updated;
  }, []);

  const getToken = () => localStorage.getItem(ACCESS_KEY);

  return (
    <AuthContext.Provider value={{
      user, loading, register, login, logout, updateProfile,
      isAuthenticated: !!user, getToken,
    }}>
      {children}
    </AuthContext.Provider>
  );
};