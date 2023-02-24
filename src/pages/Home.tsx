import { useEffect } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { LoadingPost } from "../components/LoadingPost";
import { Post } from "../components/Post";
import { Suggestions } from "../components/Suggestions";
import { auth, db } from "../config/firebase";

const postDetails = {
  username: "John Doe",
  userImg: "https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=maple",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  img: "https://source.unsplash.com/random",
};

export const Home = () => {
  const usersRef = collection(db, "users");

  // const user = getUser();

  // const addUser = async () => {
  //   if (user) {
  //     return;
  //   }
  //   const res = await addDoc(usersRef, {
  //     username: auth.currentUser?.displayName,
  //     userId: auth.currentUser?.uid,
  //     userImg: auth.currentUser?.photoURL,
  //     bio: "Welcome to my Profile",
  //   });
  //   console.log(res);
  // };

  // useEffect(() => {
  //   addUser();
  // }, [auth]);

  return (
    <div className="flex w-full">
      <div className="w-full overflow-y-scroll border-2 md:w-2/3">
        <h1 className="sticky top-0 z-10 border-b-2 bg-white p-3 text-xl font-bold">
          Home
        </h1>
        <Post
          id={"1"}
          username={postDetails.username}
          userImg={postDetails.userImg}
          content={postDetails.content}
          img={postDetails.img}
        />
        <LoadingPost />
        <LoadingPost />
      </div>
      <Suggestions />
    </div>
  );
};
