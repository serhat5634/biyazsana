import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // veya doğru olan dosya ismini yaz


const Admin = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/contact');
        setMessages(res.data);
      } catch (err) {
        console.error('❌ Mesajlar alınamadı:', err.message);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-title">📥 Gelen Mesajlar</h2>
      <hr className="admin-line" />

      {messages.length > 0 ? (
        <ul className="admin-list">
          {messages.map((msg) => (
            <li key={msg._id} className="admin-message">
              <p><strong>👤 {msg.name}</strong></p>
              <p>{msg.message}</p>
              <span className="admin-time">
                {new Date(msg.createdAt).toLocaleString('tr-TR')}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Hiç mesaj gelmemiş.</p>
      )}
    </div>
  );
};

export default Admin;
