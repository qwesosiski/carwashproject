import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Загружаем пользователя из localStorage при старте
  useEffect(() => {
    const savedUser = localStorage.getItem('aquashine_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('aquashine_user');
      }
    }
    setLoading(false);
  }, []);

  // Простая имитация регистрации (в реальном проекте — вызов API)
  const register = async ({ name, phone, email, password }) => {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Проверка: уже существует?
    const users = JSON.parse(localStorage.getItem('aquashine_users') || '[]');
    if (users.find((u) => u.email === email)) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const newUser = {
      id: Date.now(),
      name,
      phone,
      email,
      password, // ⚠️ В реальном проекте пароль НИКОГДА не хранится в открытом виде!
      registeredAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('aquashine_users', JSON.stringify(users));

    // Автоматически логиним
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('aquashine_user', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  // Имитация входа
  const login = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem('aquashine_users') || '[]');
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      throw new Error('Неверный email или пароль');
    }

    const userWithoutPassword = { ...found };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('aquashine_user', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aquashine_user');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('aquashine_user', JSON.stringify(updated));

    // Обновляем в списке всех пользователей
    const users = JSON.parse(localStorage.getItem('aquashine_users') || '[]');
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('aquashine_users', JSON.stringify(users));
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};