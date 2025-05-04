import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [replyMap, setReplyMap] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.email !== 'erdoganserhat258@gmail.com') {
      navigate('/');
    }
  }, [navigate, user]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('/contact');
        setMessages(res.data);
      } catch (err) {
        console.error('❌ Mesajlar alınamadı:', err.message);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users/all');
        setUsers(res.data);
      } catch (err) {
        console.error('❌ Kullanıcılar alınamadı:', err.message);
      }
    };
    fetchUsers();
  }, []);

  const handleReply = async (messageId, email) => {
    const replyText = replyMap[messageId];
    if (!replyText) return alert("✍️ Cevap boş olamaz paşam!");

    try {
      await axios.post('/contact/reply', {
        messageId,
        email,
        reply: replyText
      });
      alert('✅ Yanıt başarıyla gönderildi!');
      setReplyMap(prev => ({ ...prev, [messageId]: '' }));
    } catch (err) {
      console.error('❌ Yanıt gönderilemedi:', err.message);
      alert('❌ Yanıt gönderilemedi!');
    }
  };

  const handleJetonEkle = async (userId, miktar) => {
    try {
      await axios.post('/users/add-jeton', { userId, adet: miktar });
      alert(`✅ ${miktar} jeton eklendi!`);
      setUsers(prev =>
        prev.map(u => (u._id === userId ? { ...u, tokens: u.tokens + miktar } : u))
      );
    } catch (err) {
      alert('❌ Jeton eklenemedi!');
    }
  };

  const handleJetonSifirla = async (userId) => {
    try {
      await axios.post('/users/reset-jeton', { userId });
      alert('🔁 Jetonlar sıfırlandı!');
      setUsers(prev =>
        prev.map(u => (u._id === userId ? { ...u, tokens: 0 } : u))
      );
    } catch (err) {
      alert('❌ Jeton sıfırlama hatası!');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-teal-600 mb-4">📥 Gelen Mesajlar</h2>
      {messages.length > 0 ? (
        messages.map(msg => (
          <div key={msg._id}>
            <p>{msg.name} ({msg.email}) - {msg.message}</p>
            <textarea
              value={replyMap[msg._id] || ''}
              onChange={(e) => setReplyMap(prev => ({ ...prev, [msg._id]: e.target.value }))}
            />
            <button onClick={() => handleReply(msg._id, msg.email)}>Cevapla</button>
          </div>
        ))
      ) : <p>Mesaj yok.</p>}

      <h2>🪙 Kullanıcı Jetonları</h2>
      {users.map(u => (
        <div key={u._id}>
          <p>{u.name} - {u.email} ({u.tokens} jeton)</p>
          <button onClick={() => handleJetonEkle(u._id, 5)}>+5 Jeton</button>
          <button onClick={() => handleJetonSifirla(u._id)}>Sıfırla</button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
