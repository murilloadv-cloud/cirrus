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
const messaging = getMessaging(app);

export const solicitarPermissaoNotificacao = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: 'BJPYFJYMWP_o4xUAnC4zSGrvKSLl2_2JoXKs-'
    });
    if (token) {
      console.log('Token FCM:', token);
      return token;
    }
  } catch (err) {
    console.log('Erro ao obter token:', err);
  }
  return null;
};

export const ouvirNotificacoes = (callback) => {
  onMessage(messaging, (payload) => {
    callback(payload);
  });
};

export { messaging };