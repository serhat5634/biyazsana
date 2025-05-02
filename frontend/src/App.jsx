// 🌐 React ve Router
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// 📁 Componentler
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategorySidebar from './components/CategorySidebar';
import CategorySelector from './components/CategorySelector';
import CategoryForm from './components/CategoryForm';
import Result from './components/Result';
import ReklamVitrini from './components/ReklamVitrini';
import ReklamEkle from './components/ReklamEkle';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Jetonlarim from './pages/Jetonlarim';
import JetonAl from './pages/JetonAl';

// 📄 Sayfalar
import AdminPanel from './pages/AdminPanel';
import Gizlilik from './pages/Gizlilik';
import Hakkimizda from './pages/Hakkimizda';
import Iletisim from './pages/Iletisim';
import IletisimFormu from './pages/IletisimFormu';
import KullanimKosullari from './pages/KullanimKosullari';
import SSS from './pages/SSS';

// 🛠️ Util dosyaları
import formFieldsBySubcategory from './utils/formFieldsBySubcategory';
import { generateContent } from './utils/api';

// 🎨 Stil Dosyaları
import './index.css';
import './App.css';
import './components/ReklamVitrini.css';

function MainPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({});
    setResult('');
  }, [selectedSubcategory]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const cleanedData = {};
      Object.entries(formData).forEach(([key, value]) => {
        cleanedData[key] = value.trim();
      });

      const res = await generateContent({
        ...cleanedData,
        subCategory: selectedSubcategory,
        category: selectedCategory,
      });

      setResult(res.data.result);
    } catch (err) {
      setResult('❌ Bir hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentFields = formFieldsBySubcategory[selectedSubcategory] || [];

  return (
    <div className="App" style={{ display: "flex", minHeight: "100vh" }}>
      <CategorySidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />

      <div style={{ flex: 1, padding: "2rem" }}>
        {selectedSubcategory ? (
          <>
            <CategoryForm
              fields={currentFields}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />
            <Result
              result={
                result ||
                '📭 Henüz bir içerik oluşturulmadı. Yukarıdan bilgileri girip yazdırmayı deneyebilirsin.'
              }
            />
          </>
        ) : (
          <p>Sol taraftan bir kategori seçebilirsin.</p>
        )}

        <div style={{ marginTop: "3rem" }}>
          <ReklamVitrini />
        </div>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const noNavbarFooter = location.pathname === '/login';

  return (
    <>
      {!noNavbarFooter && isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/yazi" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/yazi" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path="/category/:id" element={<ProtectedRoute><CategorySelector /></ProtectedRoute>} />
        <Route path="/iletisim" element={<IletisimFormu />} />
        <Route path="/gizlilik" element={<Gizlilik />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/kullanim-kosullari" element={<KullanimKosullari />} />
        <Route path="/sss" element={<SSS />} />
        <Route path="/iletisim-detay" element={<Iletisim />} />
        <Route path="/jetonlarim" element={<ProtectedRoute><Jetonlarim /></ProtectedRoute>} />
        <Route path="/jeton-al" element={<ProtectedRoute><JetonAl /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {!noNavbarFooter && isAuthenticated && <Footer />}
    </>
  );
}

export default App;