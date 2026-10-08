import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const emailOk = (e) => /^\S+@\S+\.\S+$/.test(e);
const nameFromEmail = (e) =>
  e.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]); // in-memory registered accounts

  // Returns an error message, or null on success.
  const signUp = (name, email, password, confirm) => {
    const n = name.trim();
    const e = email.trim().toLowerCase();
    if (!n) return 'Please enter your full name.';
    if (!emailOk(e)) return 'Please enter a valid email address.';
    if (password.length < 4) return 'Password must be at least 4 characters.';
    if (password !== confirm) return 'Passwords do not match.';
    if (accounts.some((a) => a.email === e)) return 'That email is already registered. Please log in.';
    setAccounts((prev) => [...prev, { name: n, email: e, password }]);
    setUser({ name: n, email: e });
    return null;
  };

  // Registered accounts must match their password.
  // Any other email still works as a demo login (password 4+ chars).
  const login = (email, password) => {
    const e = email.trim().toLowerCase();
    if (!emailOk(e)) return 'Please enter a valid email address.';
    if (password.length < 4) return 'Password must be at least 4 characters.';
    const acc = accounts.find((a) => a.email === e);
    if (acc) {
      if (acc.password !== password) return 'Incorrect password.';
      setUser({ name: acc.name, email: acc.email });
    } else {
      setUser({ name: nameFromEmail(e), email: e });
    }
    return null;
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, signUp, logout }), [user, accounts]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
