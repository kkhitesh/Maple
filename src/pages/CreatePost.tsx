import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";

export const CreatePost = () => {
  const postsRef = collection(db, "posts");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [user] = useAuthState(auth);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await addDoc(postsRef, {
      title: title,
      description: desc,
      username: user?.displayName,
      userId: user?.uid,
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};
