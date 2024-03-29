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
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
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
  // const [loading, setLoading] = useState(false);
  const [user, loading, erro] = useAuthState(auth);
  const nav = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return nav("/login");
    return onSnapshot(
      query(
        collection(db, "posts"),
        where("bookmarks", "array-contains", user?.uid),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setPosts(snapshot.docs)
    );
  }, [db, user]);

  return (
    <div className="flex w-full">
      <div className="w-full overflow-y-scroll border-2">
        <h1 className="sticky top-0 z-10 flex items-center gap-3 border-b-2 bg-white p-3 text-xl font-bold">
          <BiLeftArrowAlt onClick={() => nav(-1)} size={24} />
          Bookmarks
        </h1>
        {loading ? (
          <div>
            <LoadingPost />
            <LoadingPost />
            <LoadingPost />
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Post
              userId={post.data().userId}
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
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">No Bookmarks</h1>
            <p className="text-gray-500">Save posts to view them here</p>
          </div>
        )}
      </div>
    </div>
  );
};
