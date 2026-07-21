importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCE71-5n9VOL7RNEwGHEdd7RyxrSpEcYiQ",
  authDomain: "cirrus-316e5.firebaseapp.com",
  projectId: "cirrus-316e5",
  storageBucket: "cirrus-316e5.firebasestorage.app",
  messagingSenderId: "942144826195",
  appId: "1:942144826195:web:efe6a5f204e29e24560fa6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/logo192.png',
    badge: '/logo192.png'
  });
});