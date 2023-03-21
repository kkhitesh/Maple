import { useState, useEffect } from "react";
import {
  BsHeart,
  BsFillHeartFill,
  BsBookmark,
  BsFillBookmarkFill,
} from "react-icons/bs";
import { BiCommentDetail, BiSend } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  userId: string;
  username: string;
  userImg: string;
  content: string;
  img?: string;
  likes?: Array<String>;
  comments?: Array<String>;
  bookmarks?: Array<String>;
}

interface CommentProp {
  username: string;
  userImg: string;
  comment: string;
}

const Comment = (props: CommentProp) => {
  const { username, userImg, comment } = props;
  return (
    <div className="flex items-center gap-2">
      <img
        className="my-2 h-6 w-6 rounded-full object-cover"
        src={userImg}
        alt=""
      />
      <p className="text-sm">
        <span className="font-semibold">{username}</span> {comment}
      </p>
    </div>
  );
};

export const Post = (props: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [user] = useAuthState(auth);
  const nav = useNavigate();

  const { id, userId, username, userImg, content, likes, bookmarks } = props;

  const postRef = doc(db, "posts", id);

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    if (likes?.includes(user?.uid as string)) {
      setIsLiked(true);
    }
    if (bookmarks?.includes(user?.uid as string)) {
      setIsBookmarked(true);
    }
  }, [likes, user, bookmarks]);

  const handleLikePost = async (e: any) => {
    e.stopPropagation();
    if (isLiked) {
      // remove like
      await updateDoc(postRef, {
        likes: arrayRemove(user?.uid),
      }).then(() => setIsLiked(false));
    } else {
      // add like
      await updateDoc(postRef, {
        likes: arrayUnion(user?.uid),
      }).then(() => setIsLiked(true));
    }
  };

  const addBookmark = async (e: any) => {
    e.stopPropagation();
    if (isBookmarked) {
      // remove bookmark
      await updateDoc(postRef, {
        bookmarks: arrayRemove(user?.uid),
      }).then(() => setIsBookmarked(false));
    } else {
      // add bookmark
      await updateDoc(postRef, {
        bookmarks: arrayUnion(user?.uid),
      }).then(() => setIsBookmarked(true));
    }
  };

  const handleClickPost = () => {
    if (window.location.pathname === `/post/${id}`) return;
    nav(`/post/${id}`);
  };

  const sendComment = async (e: any) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      id: user?.uid,
      username: user?.displayName,
      userImg: user?.photoURL,
      comment: commentToSend,
      timestamp: serverTimestamp(),
    });
  };

  const goToProfile = (e: any) => {
    e.stopPropagation();
    nav(`/user/${userId}`);
  };

  return (
    <div
      className="flex gap-5 border-b-2 p-5 hover:bg-[rgba(0,0,0,5%)]"
      onClick={handleClickPost}
    >
      {/* header  */}
      <div>
        <img
          className="h-8 w-8 cursor-pointer rounded-full"
          src={userImg}
          alt="img"
        />
      </div>
      <div className="w-full pr-5">
        <h2
          className="cursor-pointer text-lg font-bold hover:underline"
          onClick={goToProfile}
        >
          {username}
        </h2>
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
              <BsFillBookmarkFill color="skyblue" onClick={addBookmark} />
            ) : (
              <BsBookmark onClick={addBookmark} />
            )}
          </div>
        </div>
        {window.location.href.indexOf("post") != -1 && (
          <div className="mt-5">
            <div className="mb-5 flex gap-2 rounded-full border-2  p-2">
              <img
                src={user?.photoURL as string}
                className="h-8 w-8 cursor-pointer rounded-full"
                alt="user"
              />
              <input
                type="text"
                placeholder="Add a comment"
                className="w-full bg-transparent focus:outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <BiSend
                size={28}
                className="h-8 w-9 cursor-pointer rounded-full bg-black/80 p-1 text-white hover:bg-black/90"
                onClick={sendComment}
              />
            </div>
            {comments?.map((comment) => (
              <Comment
                key={comment.id}
                username={comment.data().username}
                userImg={comment.data().userImg}
                comment={comment.data().comment}
              />
            ))}
          </div>
        )}
      </div>
      {/* content  */}
      {/* icons  */}
    </div>
  );
};
