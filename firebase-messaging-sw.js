
/* SR Game Shop Firebase Cloud Messaging Service Worker */

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

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

messaging.setBackgroundMessageHandler(function(payload) {
  const notification =
    payload && payload.notification
      ? payload.notification
      : {};

  const title = notification.title || "SR Game Shop";

  const options = {
    body: notification.body || "အသိပေးချက်အသစ် ရှိပါတယ်။",
    icon: "/SR-Game-Shop/favicon.ico"
  };

  return self.registration.showNotification(title, options);
});
