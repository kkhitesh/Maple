import { useState, useEffect } from "react";
import {
  BsHeart,
  BsFillHeartFill,
  BsBookmark,
  BsFillBookmarkFill,
} from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

interface Props {
  id: string;
  username: string;
  userImg: string;
  content: string;
  img?: string;
  likes?: Array<String>;
  comments?: Array<String>;
}

export const Post = (props: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [user] = useAuthState(auth);

  const { id, username, userImg, content, likes, comments } = props;

  const likesRef = doc(db, "posts", id);

  useEffect(() => {
    if (likes?.includes(user?.uid)) {
      setIsLiked(true);
    }
  }, [likes, user]);

  const handleLikePost = async () => {
    if (isLiked) {
      // remove like
      await updateDoc(likesRef, {
        likes: arrayRemove(user?.uid),
      });
      setIsLiked(false);
    } else {
      // add like
      await updateDoc(likesRef, {
        likes: arrayUnion(user?.uid),
      });
      setIsLiked(true);
    }
  };

  return (
    <div className="flex gap-5 border-b-2 p-5">
      {/* header  */}
      <div>
        <img className="h-10 w-10 rounded-full" src={userImg} alt="img" />
      </div>
      <div className="w-full pr-5">
        <h1 className="text-lg font-bold">{username}</h1>
        <p>{content}</p>
        {props.img && (
          <img
            className="my-5 h-64 w-full rounded-xl object-cover"
            src={props.img}
            alt="img"
          />
        )}
        <div className="mt-2 flex flex-row justify-between gap-5 text-xl">
          <div className="flex items-center gap-5">
            {isLiked ? (
              <BsFillHeartFill color={"red"} onClick={handleLikePost} />
            ) : (
              <BsHeart onClick={handleLikePost} />
            )}
            {likes?.length && (
              <p className="text-base text-gray-600">{likes?.length}</p>
            )}
            <BiCommentDetail />
            {comments?.length && (
              <p className="text-base text-gray-600">{comments?.length}</p>
            )}
          </div>
          <div>
            {isBookmarked ? (
              <BsFillBookmarkFill
                color="skyblue"
                onClick={() => setIsBookmarked(!isBookmarked)}
              />
            ) : (
              <BsBookmark onClick={() => setIsBookmarked(!isBookmarked)} />
            )}
          </div>
        </div>
      </div>
      {/* content  */}
      {/* icons  */}
    </div>
  );
};
