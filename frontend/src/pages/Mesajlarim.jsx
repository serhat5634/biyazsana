import React, { useEffect, useState } from 'react';
import axios from '../axios';

const Mesajlarim = () => {
  const [myMessages, setMyMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // kullanıcıyı al

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('/contact');
        const allMessages = res.data;

        // Sadece bu kullanıcıya ait mesajları filtrele
        const filtered = allMessages.filter(msg => msg.email === user?.email);
        setMyMessages(filtered);
      } catch (err) {
        console.error('❌ Mesajlar alınamadı:', err.message);
      }
    };

    if (user) fetchMessages();
  }, [user]);

  if (!user) return <p className="text-center mt-6">Lütfen giriş yapınız.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-teal-600">📬 Mesajların ve Yanıtların</h2>
      {myMessages.length > 0 ? (
        myMessages.map((msg) => (
          <div key={msg._id} className="mb-6 p-4 border rounded">
            <p><strong>Senin Mesajın:</strong></p>
            <p>{msg.message}</p>
            <hr className="my-2" />
            <p><strong>Yanıt:</strong></p>
            {msg.reply ? (
              <p className="text-green-700">{msg.reply}</p>
            ) : (
              <p className="text-gray-400 italic">Henüz yanıtlanmadı</p>
            )}
            <p className="text-sm text-gray-500 mt-2">{new Date(msg.createdAt).toLocaleString('tr-TR')}</p>
          </div>
        ))
      ) : (
        <p>Hiç mesajınız bulunmuyor.</p>
      )}
    </div>
  );
};

export default Mesajlarim;
