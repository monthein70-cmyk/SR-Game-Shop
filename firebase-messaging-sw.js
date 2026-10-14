
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyALqp9IxejZ2b4d3vJMGuwV0RWPxpQRsaU",
  authDomain: "diamondshop-b56ab.firebaseapp.com",
  databaseURL: "https://diamondshop-b56ab-default-rtdb.firebaseio.com",
  projectId: "diamondshop-b56ab",
  storageBucket: "diamondshop-b56ab.firebasestorage.app",
  messagingSenderId: "504521967191",
  appId: "1:504521967191:web:215ead398cab81444f8512",
  measurementId: "G-9RGLMY2F05"
};

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "SR Game Shop";
  const options = {
    body: payload.notification?.body || "အသိပေးချက်အသစ် ရှိပါတယ်။"
  };

  self.registration.showNotification(title, options);
});
