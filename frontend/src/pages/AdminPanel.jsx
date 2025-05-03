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

  // Mesajları çek
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

  // Kullanıcıları çek
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
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, tokens: u.tokens + miktar } : u))
      );
    } catch (err) {
      alert('❌ Jeton eklenemedi!');
    }
  };

  const handleJetonSifirla = async (userId) => {
    try {
      await axios.post('/users/reset-jeton', { userId });
      alert('🔁 Jetonlar sıfırlandı!');
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, tokens: 0 } : u))
      );
    } catch (err) {
      alert('❌ Jeton sıfırlama hatası!');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-teal-600 mb-4">📥 Gelen Mesajlar</h2>
      <hr className="mb-8" />

      {messages.length > 0 ? (
        <ul className="space-y-6">
          {messages.map((msg) => (
            <li key={msg._id} className="bg-white border p-4 rounded-lg shadow-sm">
              <p className="font-semibold">👤 {msg.name} ({msg.email})</p>
              <p className="mt-1">{msg.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(msg.createdAt).toLocaleString('tr-TR')}
              </p>
              <textarea
                rows={2}
                placeholder="✍️ Cevap yaz..."
                value={replyMap[msg._id] || ''}
                onChange={(e) =>
                  setReplyMap((prev) => ({ ...prev, [msg._id]: e.target.value }))
                }
                className="w-full border p-2 mt-2 rounded"
              />
              <button
                onClick={() => handleReply(msg._id, msg.email)}
                className="mt-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
              >
                Gönder ✉️
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Hiç mesaj gelmemiş.</p>
      )}

      <hr className="my-10" />

      <h2 className="text-2xl font-bold text-indigo-600 mb-4">🪙 Kullanıcı Jeton Kontrol Paneli</h2>
      <table className="w-full border text-left bg-white shadow-sm rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">👤 Ad</th>
            <th className="p-3">📧 E-posta</th>
            <th className="p-3">🪙 Jeton</th>
            <th className="p-3">⚙️ İşlem</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.tokens}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleJetonEkle(u._id, 5)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                >
                  +5 Jeton
                </button>
                <button
                  onClick={() => handleJetonSifirla(u._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Sıfırla
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
