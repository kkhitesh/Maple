import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoadingPost } from "../components/LoadingPost";
import { Post } from "../components/Post";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [userAuth, loading, error] = useAuthState(auth);

  const nav = useNavigate();

  const getUserData = () => {
    console.log("hello");
    if (loading) return;
    if (!userAuth) return nav("/login");
    console.log(userAuth?.uid);
    return onSnapshot(doc(db, "users", userAuth?.uid as string), (snapshot) => {
      console.log("hello1");
      const data = snapshot.data();
      return onSnapshot(
        query(
          collection(db, "posts"),
          orderBy("timestamp", "desc"),
          where("userId", "in", data?.following)
        ),
        (snapshot) => setPosts(snapshot.docs)
      );
    });
  };

  useEffect(() => {
    try {
      return getUserData();
    } catch (err) {
      console.log(err);
    }
  }, [db, userAuth]);

  console.log(posts);

  return (
    <div className="flex w-full">
      <div className="w-full overflow-y-scroll border-2 ">
        <h1 className="sticky top-0 z-10 border-b-2 bg-white p-3 text-xl font-bold">
          Home
        </h1>
        {posts.length !== 0 ? (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              userId={post.data().userId}
              username={post.data().username}
              userImg={post.data().userImg}
              content={post.data().caption}
              img={post.data().img}
              likes={post.data().likes}
              comments={post.data().comments}
              bookmarks={post.data().bookmarks}
            />
          ))
        ) : (
          <div>
            <LoadingPost />
            <LoadingPost />
            <LoadingPost />
          </div>
        )}
      </div>
    </div>
  );
};
