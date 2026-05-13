import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const API = 'http://localhost:5001/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('nv_user');
    return stored ? JSON.parse(stored) : null;
  });

  const token = () => localStorage.getItem('nv_token');

  const register = async (fullName, email, phone, password) => {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, message: data.error || 'Registration failed.' };
      return { success: true };
    } catch {
      return { success: false, message: 'Cannot connect to server.' };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, message: data.error || 'Invalid email or password.' };
      const safeUser = { id: data.user?.id, fullName: data.user?.fullName, email: data.user?.email };
      setUser(safeUser);
      localStorage.setItem('nv_user', JSON.stringify(safeUser));
      localStorage.setItem('nv_token', data.token);
      return { success: true };
    } catch {
      return { success: false, message: 'Cannot connect to server.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nv_user');
    localStorage.removeItem('nv_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
