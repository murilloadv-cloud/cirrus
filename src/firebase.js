import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCE71-5n9VOL7RNEwGHEdd7RyxrSpEcYiQ",
  authDomain: "cirrus-316e5.firebaseapp.com",
  projectId: "cirrus-316e5",
  storageBucket: "cirrus-316e5.firebasestorage.app",
  messagingSenderId: "942144826195",
  appId: "1:942144826195:web:efe6a5f204e29e24560fa6"
};

const app = initializeApp(firebaseConfig);

const isSupported = () =>
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in navigator;

export const solicitarPermissaoNotificacao = async () => {
  if (!isSupported()) return null;
  try {
    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey: 'BJPYFJYMWP_o4xUAnC4zSGrvKSLl2_2JoXKs-'
    });
    if (token) return token;
  } catch (err) {
    console.log('Erro FCM:', err);
  }
  return null;
};

export const ouvirNotificacoes = (callback) => {
  if (!isSupported()) return;
  try {
    const messaging = getMessaging(app);
    onMessage(messaging, callback);
  } catch (err) {
    console.log('Erro onMessage:', err);
  }
};