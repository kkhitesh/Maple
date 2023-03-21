import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { Post } from "./Post";

export const PostDetails = () => {
  const { id } = useParams();
  const nav = useNavigate();

  // const {  username, userImg, content, img, likes, comments } = state;

  const [post, setPost] = useState<DocumentData>({});

  //ts-nocheck
  useEffect(() => {
    return onSnapshot(doc(db, "posts", id), (snapshot) =>
      setPost(snapshot.data())
    );
  }, [db]);

  return (
    <div className="flex w-full">
      <div className="w-full overflow-y-scroll border-2">
        <h1 className="sticky top-0 z-10 flex items-center gap-3 border-b-2 bg-white p-3 text-xl font-bold">
          <BiLeftArrowAlt onClick={() => nav(-1)} size={24} />
          Post
        </h1>
        <Post
          id={id as string}
          userId={post?.userId}
          username={post?.username}
          userImg={post?.userImg}
          content={post?.caption}
          img={post?.img}
          likes={post?.likes}
          comments={post?.comments}
        />
      </div>
    </div>
  );
};
