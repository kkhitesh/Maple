import { Link, useNavigate } from "react-router-dom";
import {
  BiHome,
  BiSearch,
  BiUserCircle,
  BiPlusCircle,
  BiCompass,
  BiExit,
} from "react-icons/bi";
import { BsBookmarks } from "react-icons/bs";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";

export const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [userAuth, loading] = useAuthState(auth);
  const [user, setUser] = useState<DocumentData>({});

  const nav = useNavigate();

  const signUserOut = () => {
    console.log("signing out");
    signOut(auth);
    nav("/home");
  };

  useEffect(() => {
    if (loading) return;
    if (!userAuth) return nav("/homepage");

    const userRef = doc(db, "users", userAuth?.uid as string);

    return onSnapshot(userRef, (doc) => {
      setUser(doc.data());
    });
  }, [db, userAuth]);

  return (
    <div className="text-md flex h-full w-1/6 flex-col justify-between bg-light p-3 md:w-1/3 md:p-10 lg:pl-20">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onClose={() => setShowModal(false)}
        user={user}
      />
      <div className="flex flex-col text-2xl font-semibold">
        <h1 className="mb-6 flex items-center gap-4 font-Montez text-4xl font-semibold">
          <FaCanadianMapleLeaf className="text-5xl text-brand" />
          <span className="hidden md:block">Maple</span>
        </h1>
        <Link
          to="/"
          className="mt-2 flex w-max items-center gap-3 p-3 hover:rounded-full hover:bg-[rgba(0,0,0,5%)] md:pr-10"
        >
          <BiHome />
          <span className="hidden md:block">Home</span>
        </Link>
        <Link
          to="/explore"
          className="mt-2 flex w-max items-center gap-3 p-3 hover:rounded-full hover:bg-[rgba(0,0,0,5%)] lg:pr-10"
        >
          <BiCompass />
          <span className="hidden md:block">Explore</span>
        </Link>
        {/* <Link
          to="/search"
          className="mt-2 flex w-max items-center gap-3 p-3 pr-10 hover:rounded-full hover:bg-[rgba(0,0,0,5%)]"
        >
          <BiSearch />
          <span className="hidden md:block">Search</span>
        </Link> */}
        <Link
          to="/bookmarks"
          className="mt-2 flex w-max items-center gap-3 p-3 hover:rounded-full hover:bg-[rgba(0,0,0,5%)]"
        >
          <BsBookmarks />
          <span className="hidden md:block">Bookmarks</span>
        </Link>
        <Link
          to={`/user/${userAuth?.uid}`}
          className="mt-2 flex w-max items-center gap-3 p-3 hover:rounded-full hover:bg-[rgba(0,0,0,5%)]"
        >
          <BiUserCircle />
          <span className="hidden md:block">Profile</span>
        </Link>
      </div>
      <div>
        <div
          className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand p-3 text-2xl font-semibold text-white"
          onClick={() => setShowModal(true)}
        >
          <BiPlusCircle />
          <span className="hidden md:block">Post</span>
        </div>
        <div>
          {user && (
            <div className="transition-color mt-6 flex items-center justify-between rounded-full p-4 duration-1000 ease-out hover:bg-[rgba(0,0,0,7%)]">
              <div className="flex gap-5">
                <img
                  className="hidden h-12 w-12 rounded-full md:block"
                  src={user?.userImg || ""}
                  alt="img"
                />
                <div className="hidden md:block">
                  <h1 className="text-md font-semibold">{user?.username}</h1>
                </div>
              </div>
              <BiExit
                onClick={signUserOut}
                size={32}
                className="text-black/60 hover:text-brand"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
