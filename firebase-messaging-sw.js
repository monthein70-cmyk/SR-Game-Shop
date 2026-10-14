
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyALqp9IxejZ2b4d3vJMGuwV0RWPxpQRsaU",
  authDomain: "diamondshop-b56ab.firebaseapp.com",
  databaseURL: "https://diamondshop-b56ab-default-rtdb.firebaseio.com",
  projectId: "diamondshop-b56ab",
  storageBucket: "diamondshop-b56ab.firebasestorage.app",
  messagingSenderId: "504521967191",
  appId: "1:504521967191:web:215ead398cab81444f8512",
  measurementId: "G-9RGLMY2F05"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const title = payload.notification?.title || "SR Game Shop";

  return self.registration.showNotification(title, {
    body: payload.notification?.body || "You have a new notification!",
    icon: "/SR-Game-Shop/favicon.ico",
    data: { url: "/SR-Game-Shop/" }
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const url = event.notification.data?.url || "/SR-Game-Shop/";

  event.waitUntil(clients.openWindow(url));
});
