import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

async function register(email, password, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save role to Firestore
    await setDoc(doc(db, "users", user.email), { role });

    alert("User registered successfully!");
  } catch (error) {
    alert("Registration failed: " + error.message);
  }
}
