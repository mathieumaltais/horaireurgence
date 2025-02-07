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
// ✅ Initialize Firebase FIRST before using auth or db
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ✅ Login Function
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Get user role from Firestore
        const userDoc = await db.collection("users").doc(email).get();
        const role = userDoc.exists ? userDoc.data().role : "user"; // Default role is "user"

        // Redirect based on role
        if (role === "admin") {
            window.location.href = "/admin-dashboard.html"; // Redirect admin
        } else {
            window.location.href = `/calendar.html?user=${encodeURIComponent(email)}`; // Redirect user to their calendar
        }
    } catch (error) {
        errorMessage.textContent = "Échec de la connexion: " + error.message;
    }
}
}
