// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Buat Context
const AuthContext = createContext(null);

// 2. Buat Provider
export const AuthProvider = ({ children }) => {
  // ... (kode AuthProvider Anda)
};

// Ini adalah bagian yang HARUS Anda pastikan sudah benar:
// Pastikan ada 'export const' di sini
export const useAuth = () => {
  return useContext(AuthContext);
};