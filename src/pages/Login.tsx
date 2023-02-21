import { auth, db, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

export const Login = () => {
  const nav = useNavigate();
  const usersRef = collection(db, "users");

  const addUser = async () => {
    const res = await addDoc(usersRef, {
      username: auth.currentUser?.displayName,
      userId: auth.currentUser?.uid,
      userImg: auth.currentUser?.photoURL,
      bio: "Welcome to my Profile",
    });
    console.log(res);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
    addUser();
    nav("/");
  };

  return (
    <div>
      <p>Sign in with Google to continue</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
