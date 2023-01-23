import { Link } from "react-router-dom";
import {
  BiHome,
  BiSearch,
  BiEnvelope,
  BiUserCircle,
  BiPlusCircle,
} from "react-icons/bi";
import { FaCanadianMapleLeaf } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <div className="flex-col w-1/4 bg-light h-full text-md flex justify-between p-10 pl-24">
      <div className="text-2xl flex-col flex font-semibold">
        <h1 className="text-4xl mb-6 flex items-center gap-4 font-Montez font-semibold">
          <FaCanadianMapleLeaf className="text-brand text-5xl" /> Maple
          {/* 🍁 Maple */}
        </h1>
        <Link
          to="/"
          className="p-3 w-max mt-2 hover:rounded-full hover:bg-[rgba(0,0,0,5%)] flex items-center gap-3"
        >
          <BiHome />
          Home
        </Link>
        <Link
          to="/"
          className="p-3 w-max mt-2 hover:rounded-full hover:bg-[rgba(0,0,0,5%)] flex items-center gap-3"
        >
          <BiSearch />
          Explore
        </Link>
        <Link
          to="/"
          className="p-3 w-max mt-2 hover:rounded-full hover:bg-[rgba(0,0,0,5%)] flex items-center gap-3"
        >
          <BiEnvelope />
          Inbox
        </Link>
        <Link
          to="/"
          className="p-3 w-max mt-2 hover:rounded-full hover:bg-[rgba(0,0,0,5%)] flex items-center gap-3"
        >
          <BiUserCircle />
          Profile
        </Link>
      </div>
      <div>
        <div className="bg-brand cursor-pointer text-2xl text-white p-3 rounded-full flex justify-center items-center gap-2 font-semibold">
          <BiPlusCircle />
          Post
        </div>
      </div>
    </div>
  );
};
