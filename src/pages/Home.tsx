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

export const Home = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [userAuth] = useAuthState(auth);

  const getUserData = () => {
    return onSnapshot(doc(db, "users", userAuth?.uid), (snapshot) => {
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
    return getUserData();
  }, [db]);

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
