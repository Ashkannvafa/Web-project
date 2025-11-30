"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in
  const router = useRouter();

  // Check LocalStorage on load (persists login on refresh)
  useEffect(() => {
    const currentUser = localStorage.getItem('harmoniq_currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  // Register a new user
  const register = (name, email, password) => {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('harmoniq_users') || '[]');

    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: "Email already registered" };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In production, this should be hashed
      type: "Artist",
      createdAt: new Date().toISOString()
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem('harmoniq_users', JSON.stringify(users));

    // Log them in automatically
    const userSession = { id: newUser.id, name: newUser.name, email: newUser.email, type: newUser.type };
    setUser(userSession);
    localStorage.setItem('harmoniq_currentUser', JSON.stringify(userSession));

    // Initialize empty data for this user
    localStorage.setItem(`harmoniq_tracks_${newUser.id}`, JSON.stringify([]));
    localStorage.setItem(`harmoniq_transactions_${newUser.id}`, JSON.stringify([]));
    localStorage.setItem(`harmoniq_balance_${newUser.id}`, '0');
    localStorage.setItem(`harmoniq_totalStreams_${newUser.id}`, '0');
    localStorage.setItem(`harmoniq_chartData_${newUser.id}`, JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

    router.push('/dashboard');
    return { success: true };
  };

  // Login existing user
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('harmoniq_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    const userSession = { id: foundUser.id, name: foundUser.name, email: foundUser.email, type: foundUser.type };
    setUser(userSession);
    localStorage.setItem('harmoniq_currentUser', JSON.stringify(userSession));

    router.push('/dashboard');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('harmoniq_currentUser');
    router.push('/'); // Auto redirect to home
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('harmoniq_currentUser', JSON.stringify(updatedUser));

    // Also update in users list
    const users = JSON.parse(localStorage.getItem('harmoniq_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };
      localStorage.setItem('harmoniq_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);