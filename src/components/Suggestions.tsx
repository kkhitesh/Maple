import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { SearchBar } from "./SearchBar";

interface UserProps {
  uid: string;
  username: string;
  userImg: string;
  followers: string[];
  following: string[];
}

const RecProfile = (props: UserProps) => {
  const { uid, username, userImg, followers, following } = props;
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [userAuth] = useAuthState(auth);

  const nav = useNavigate();

  useEffect(() => {
    if (followers?.includes(uid)) {
      setIsFollowing(true);
    }
  }, [userAuth?.uid]);

  const userRef = doc(db, "users", uid);
  const userAuthRef = doc(db, "users", userAuth?.uid);

  const goToProfile = () => {
    nav(`/user/${uid}`);
  };

  const handleFollow = async () => {
    if (isFollowing) {
      await updateDoc(userRef, {
        followers: arrayRemove(userAuth?.uid),
      }).then(() => setIsFollowing(false));
      await updateDoc(userAuthRef, {
        following: arrayRemove(uid),
      });
    } else {
      await updateDoc(userRef, {
        followers: arrayUnion(userAuth?.uid),
      }).then(() => setIsFollowing(true));
      await updateDoc(userAuthRef, {
        following: arrayUnion(uid),
      });
    }
  };

  return (
    <div className="transition-color flex items-center justify-between p-4 duration-1000 ease-out hover:bg-[rgba(0,0,0,7%)]">
      <div className="flex gap-5">
        <img src={userImg} className="h-12 w-12 rounded-full" alt="" />
        <div>
          <h1 className="font-semibold" onClick={goToProfile}>
            {username}
          </h1>
        </div>
      </div>
      <div
        className={`cursor-pointer rounded-full bg-gray-800 p-2 px-5 text-white ${
          isFollowing && "bg-gray-800/80"
        }`}
        onClick={handleFollow}
      >
        {isFollowing ? "Following" : "Follow"}
      </div>
    </div>
  );
};

export const Suggestions = () => {
  const [users, setUsers] = useState<DocumentData[]>([]);

  const recUsers = users?.sort(() => 0.5 - Math.random()).slice(0, 3);

  useEffect(() => {
    return onSnapshot(query(collection(db, "users")), (snapshot) => {
      return setUsers(snapshot.docs);
    });
  }, [db]);

  return (
    <div className="mr-10 hidden w-1/2 p-4 lg:block">
      {window.location.pathname !== "/search" && <SearchBar data={users} />}
      <div className="mt-4 w-full rounded-xl bg-[rgba(0,0,0,3%)]">
        <h2 className="px-4 py-2 text-xl font-bold ">Who to Follow</h2>
        {recUsers.map((user) => (
          <RecProfile
            key={user.id}
            uid={user.id}
            followers={user.data().followers}
            following={user.data().following}
            username={user.data().username}
            userImg={user.data().userImg}
          />
        ))}
        <Link to="/search">
          <h3 className="transition-color rounded-b-xl p-4 text-brand duration-1000 ease-out hover:bg-[rgba(0,0,0,7%)]">
            Show More{" "}
          </h3>
        </Link>
      </div>
    </div>
  );
};
