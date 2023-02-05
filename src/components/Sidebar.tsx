import { Link } from "react-router-dom";
import {
  BiHome,
  BiSearch,
  BiEnvelope,
  BiUserCircle,
  BiPlusCircle,
  BiDotsHorizontalRounded,
  BiExit,
} from "react-icons/bi";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import Modal from "./Modal";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const signUserOut = () => {
  console.log("signing out");
  // signOut(auth);
};

export const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <div className="text-md flex h-full w-1/3 flex-col justify-between bg-light p-10 pl-24">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onClose={() => setShowModal(false)}
        user={user}
      />
      <div className="flex flex-col text-2xl font-semibold">
        <h1 className="mb-6 flex items-center gap-4 font-Montez text-4xl font-semibold">
          <FaCanadianMapleLeaf className="text-5xl text-brand" /> Maple
          {/* 🍁 Maple */}
        </h1>
        <Link
          to="/"
          className="mt-2 flex w-max items-center gap-3 p-3 pr-10 hover:rounded-full hover:bg-[rgba(0,0,0,5%)]"
        >
          <BiHome />
          Home
        </Link>
        <Link
          to="/"
          className="mt-2 flex w-max items-center gap-3 p-3 pr-10 hover:rounded-full hover:bg-[rgba(0,0,0,5%)]"
        >
          <BiSearch />
          Explore
        </Link>
        <Link
          to="/"
          className="mt-2 flex w-max items-center gap-3 p-3 pr-10 hover:rounded-full hover:bg-[rgba(0,0,0,5%)]"
        >
          <BiEnvelope />
          Inbox
        </Link>
        <Link
          to="/"
          className="mt-2 flex w-max items-center gap-3 p-3 pr-10 hover:rounded-full hover:bg-[rgba(0,0,0,5%)]"
        >
          <BiUserCircle />
          Profile
        </Link>
      </div>
      <div>
        <div
          className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand p-3 text-2xl font-semibold text-white"
          onClick={() => setShowModal(true)}
        >
          <BiPlusCircle />
          Post
        </div>
        <div>
          {user && (
            <div className="transition-color mt-6 flex items-center justify-between rounded-full p-4 duration-1000 ease-out hover:bg-[rgba(0,0,0,7%)]">
              <div className="flex gap-5">
                <img
                  className="h-12 w-12 rounded-full"
                  src={user?.photoURL || ""}
                  alt="img"
                />
                <div>
                  <h1 className="font-semibold">{user?.displayName}</h1>
                  <p>@username</p>
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
