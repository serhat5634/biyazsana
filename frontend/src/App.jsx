import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// 📁 Components
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

// 📄 Pages
import AdminPanel from './pages/AdminPanel';
import Gizlilik from './pages/Gizlilik';
import Hakkimizda from './pages/Hakkimizda';
import Iletisim from './pages/Iletisim';
import IletisimFormu from './pages/IletisimFormu';
import KullanimKosullari from './pages/KullanimKosullari';
import SSS from './pages/SSS';
import Jetonlarim from './pages/Jetonlarim';
import JetonAl from './pages/JetonAl';
import Mesajlarim from './pages/Mesajlarim';
import JetonBasarili from './pages/JetonBasarili';
import JetonBasarisiz from './pages/JetonBasarisiz';

// 🛠️ Utilities
import formFieldsBySubcategory from './utils/formFieldsBySubcategory';
import { generateContent } from './utils/api';

// 🎨 Styles
import './index.css';
import './App.css';

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
      const cleanedData = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v.trim()])
      );

      const res = await generateContent({
        ...cleanedData,
        subCategory: selectedSubcategory,
        category: selectedCategory,
      });

      setResult(res.data.result);
    } catch (err) {
      setResult('❌ Hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentFields = formFieldsBySubcategory[selectedSubcategory] || [];

  return (
    <div className="App" style={{ display: 'flex', minHeight: '100vh' }}>
      <CategorySidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />

      <div style={{ flex: 1, padding: '2rem' }}>
        {selectedSubcategory ? (
          <>
            <CategoryForm
              fields={currentFields}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />
            <Result result={result || '📭 İçerik henüz oluşturulmadı.'} />
          </>
        ) : (
          <p>Sol taraftan kategori seçebilirsin.</p>
        )}

        <div style={{ marginTop: '3rem' }}>
          <ReklamVitrini />
        </div>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const isAuthenticated = !!sessionStorage.getItem('token');
  const hideNavbarFooter = location.pathname === '/login';

  return (
    <>
      {!hideNavbarFooter && isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? '/yazi' : '/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/yazi" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path="/category/:id" element={<ProtectedRoute><CategorySelector /></ProtectedRoute>} />
        <Route path="/iletisim" element={<IletisimFormu />} />
        <Route path="/gizlilik" element={<Gizlilik />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/kullanim-kosullari" element={<KullanimKosullari />} />
        <Route path="/sss" element={<SSS />} />
        <Route path="/jetonlarim" element={<ProtectedRoute><Jetonlarim /></ProtectedRoute>} />
        <Route path="/jeton-al" element={<ProtectedRoute><JetonAl /></ProtectedRoute>} />
        <Route path="/jeton-basarili" element={<JetonBasarili />} />
        <Route path="/jeton-basarisiz" element={<JetonBasarisiz />} />
        <Route path="/reklam" element={<ProtectedRoute><ReklamEkle /></ProtectedRoute>} />
        <Route path="/mesajlarim" element={<ProtectedRoute><Mesajlarim /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {!hideNavbarFooter && isAuthenticated && <Footer />}
    </>
  );
}

export default App;
