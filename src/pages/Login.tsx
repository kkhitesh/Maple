import { auth, db, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export const Login = () => {
  const nav = useNavigate();
  const usersRef = collection(db, "users");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const docRef = doc(usersRef, result.user?.uid);
        const docSnap = getDoc(docRef).then((d) => {
          if (!d.exists()) {
            return setDoc(
              doc(usersRef, result.user?.uid),
              {
                username: result.user?.displayName,
                userId: result.user?.uid,
                userImg: result.user?.photoURL,
                bio: "Welcome to my Profile",
                bookmarks: [],
                followers: [],
                following: [],
              },
              { merge: true }
            );
          }
        });
      })
      .then(() => {
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <p>Sign in with Google to continue</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
