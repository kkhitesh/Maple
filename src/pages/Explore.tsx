import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { LoadingPost } from "../components/LoadingPost";
import { Post } from "../components/Post";
import { Suggestions } from "../components/Suggestions";
import { db } from "../config/firebase";

interface Post {
  id: string;
  username: string;
  userImg: string;
  caption: string;
  img?: string;
  timestamp: Date;
}

export const Explore = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => setPosts(snapshot.docs)
    );
  }, [db]);

  console.log(posts);

  return (
    <div className="flex w-full">
      <div className="w-2/3 overflow-y-scroll border-2">
        <h1 className="sticky top-0 z-10 border-b-2 bg-white p-3 text-xl font-bold">
          Explore
        </h1>
        <div className="my-2 mx-4 flex items-center justify-around">
          <div className="flex w-full items-center gap-3 rounded-full bg-[rgba(0,0,0,5%)] px-4 py-3">
            <BiSearch className="text-2xl text-[rgba(0,0,0,40%)]" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none"
            />
          </div>
        </div>
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
            />
          ))
        )}
      </div>
      <Suggestions />
    </div>
  );
};
