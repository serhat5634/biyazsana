import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');  // 🔐 SessionStorage kullanımı netleşti
  const location = useLocation();

  if (!token) {
    // 🚨 Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ Token varsa içeriği göster
  return children;
};

export default ProtectedRoute;
