import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { Post } from "./Post";
import { Suggestions } from "./Suggestions";

export const PostDetails = () => {
  const { state } = useLocation();

  const { id, username, userImg, content, img, likes, comments } = state;

  return (
    <div className="flex w-full">
      <div className="w-full overflow-y-scroll border-2 lg:w-2/3">
        <h1 className="sticky top-0 z-10 border-b-2 bg-white p-3 text-xl font-bold">
          Post
        </h1>
        <Post
          id={id}
          username={username}
          userImg={userImg}
          content={content}
          img={img}
          likes={likes}
          comments={comments}
        />
      </div>
      <Suggestions />
    </div>
  );
};
