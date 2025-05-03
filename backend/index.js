// 🌱 ENV değişkenlerini oku
const dotenv = require('dotenv');
dotenv.config();

// 🚀 Express ve modüller
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

const app = express();

// 🔧 Proxy ayarı (rate limiter için zorunlu)
app.set('trust proxy', 1);

// 🔐 Güvenlik
app.use(helmet());
app.use(compression());

// 🛡️ Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "⚠️ Çok fazla istek attınız, lütfen biraz bekleyin.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// 🌐 CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://biyazsana.com",
    "https://www.biyazsana.com",
    "https://biyazsana-backend-1.onrender.com",
    "https://biyazsana.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

// 🌍 MongoDB Bağlantısı (güncellendi 🚀)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB bağlantısı başarılı'))
  .catch(err => console.error('❌ MongoDB bağlantı hatası:', err));

// 📌 Express Session (MongoDB Store güvenli ve güncel 🛡️)
app.use(session({
  secret: process.env.SESSION_SECRET || 'gizliSessionAnahtarı',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: 'none'
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// 🔑 Passport (Google OAuth ✅)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user)).catch(done);
});

// 🔁 Google Strategy (Güvenli ve Doğru URL 🔐)
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "https://biyazsana.com/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: profile.id
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// 🧠 API Rotaları
const generateRoute = require('./routes/generate');
const reklamlarRoute = require('./routes/ads');
const contactRoute = require('./routes/contact');
const mesajlarRoute = require('./routes/mesajlar');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const paytrRoute = require('./routes/paytr');

// 🚀 Rotalar
app.use('/api/generate', generateRoute);
app.use('/api/reklamlar', reklamlarRoute);
app.use('/api/contact', contactRoute);
app.use('/api/mesajlar', mesajlarRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/paytr', paytrRoute);

// 🟢 Sunucu Başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
