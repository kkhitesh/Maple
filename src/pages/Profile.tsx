import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { auth, db } from "../config/firebase";

export const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<DocumentData>({});
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const nav = useNavigate();
  const [userAuth] = useAuthState(auth);

  useEffect(() => {
    return onSnapshot(query(doc(db, "users", id)), (snapshot) =>
      setUser(snapshot.data())
    );
  }, [db, id]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), where("userId", "==", id)),
      (snapshot) => setPosts(snapshot.docs)
    );
  }, [db, id]);

  const handleFollow = () => {};

  const handleEditProfile = () => {};

  return (
    <div className="flex w-full">
      <div className="w-full overflow-y-scroll border-2">
        <h1 className="sticky top-0 z-10 flex items-center gap-3 border-b-2 bg-white p-3 text-xl font-bold">
          <BiLeftArrowAlt onClick={() => nav(-1)} size={24} />
          {user?.username}
        </h1>
        <div className="-translate-y-16">
          <div className=" border-b-2">
            <div
              style={{
                background: "linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)",
              }}
              className="relative top-16 -z-10 h-40"
            ></div>
            <div className="flex items-center justify-between p-5">
              <div>
                <img
                  src={user.userImg}
                  className="h-25 w-25 rounded-full border-4 border-brand/70 p-1"
                />
                <h1 className="text-xl font-semibold">{user.username}</h1>
              </div>
              {id !== userAuth?.uid ? (
                <div
                  className="mt-7 h-10 cursor-pointer rounded-full bg-gray-800 p-2 px-5 text-white"
                  onClick={handleFollow}
                >
                  Follow
                </div>
              ) : (
                <div
                  className="mt-7 h-10 cursor-pointer rounded-full bg-gray-800 p-2 px-5 text-white"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </div>
              )}
            </div>
            <p className="px-5">{user.bio}</p>
            <div className="flex gap-5 px-5 py-5">
              <span>
                <strong>{user?.following?.length}</strong> Following
              </span>
              <span>
                <strong>{user?.followers?.length}</strong> Followers
              </span>
            </div>
          </div>
          <div>
            {posts.map((post) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
