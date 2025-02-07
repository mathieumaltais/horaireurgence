import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Retrieve user role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.email));
    const role = userDoc.exists() ? userDoc.data().role : "user"; // Default to "user"

    // Redirect based on role
    if (role === "admin") {
      window.location.href = "/admin-dashboard.html"; // Admin dashboard
    } else {
      window.location.href = `/calendar.html?user=${user.email}`; // User calendar
    }

  } catch (error) {
    alert("Login failed: " + error.message);
  }
}
