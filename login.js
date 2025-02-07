<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBDwCt973qhUxk1_5UqTNDy82pef2GQFcc",
    authDomain: "horaireurgence-a488f.firebaseapp.com",
    projectId: "horaireurgence-a488f",
    storageBucket: "horaireurgence-a488f.firebasestorage.app",
    messagingSenderId: "596792304337",
    appId: "1:596792304337:web:0dcd3e0b77b374343a9bf0",
    measurementId: "G-Z67Y8T809L"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
