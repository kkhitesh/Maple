import {
  collection,
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

interface Post {
  id: string;
  username: string;
  userImg: string;
  caption: string;
  img?: string;
  timestamp: Date;
}

export const Bookmarks = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  console.log(user?.uid);

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "posts"),
        where("bookmarks", "array-contains", user?.uid),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setPosts(snapshot.docs)
    );
  }, [db]);

  console.log(posts);

  return (
    <div className="flex w-full">
      <div className="w-full overflow-y-scroll border-2">
        <h1 className="sticky top-0 z-10 border-b-2 bg-white p-3 text-xl font-bold">
          Bookmarks
        </h1>
        {loading ? (
          <div>
            <LoadingPost />
            <LoadingPost />
            <LoadingPost />
          </div>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              username={post.data().username}
              userImg={post.data().userImg}
              content={post.data().caption}
              img={post.data().img}
              likes={post.data().likes}
              comments={post.data().comments}
              bookmarks={post.data().bookmarks}
            />
          ))
        )}
      </div>
    </div>
  );
};
