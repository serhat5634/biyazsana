import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-links">
      <Link to="/hakkimizda">Hakkımızda</Link>
      <Link to="/gizlilik">Gizlilik</Link>
      <Link to="/kullanim-kosullari">Kullanım Koşulları</Link>
      <Link to="/sss">SSS</Link>
      <Link to="/iletisim">İletişim</Link>
    </div>
    <p className="footer-copy">© {new Date().getFullYear()} BiYazsana. Tüm hakları saklıdır.</p>
  </footer>
);

export default Footer;
