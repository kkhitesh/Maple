import { BiSearch } from "react-icons/bi";

const RecProfile = () => {
  return (
    <div className="transition-color flex items-center justify-between p-4 duration-1000 ease-out hover:bg-[rgba(0,0,0,7%)]">
      <div className="flex gap-5">
        <div className="h-12 w-12 rounded-full bg-brand"></div>
        <div>
          <h1 className="font-semibold">John Doe</h1>
          <p>@john</p>
        </div>
      </div>
      <div className="rounded-full bg-gray-800 p-2 px-5 text-white">Follow</div>
    </div>
  );
};

export const Suggestions = () => {
  return (
    <div className="mr-10 w-1/3 p-4">
      <div className="flex items-center justify-around ">
        <div className="flex w-full items-center gap-3 rounded-full bg-[rgba(0,0,0,5%)] px-4 py-3">
          <BiSearch className="text-2xl text-[rgba(0,0,0,40%)]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-4 w-full rounded-xl bg-[rgba(0,0,0,3%)]">
        <h2 className="px-4 py-2 text-xl font-bold ">Who to Follow</h2>
        <RecProfile />
        <RecProfile />
        <RecProfile />
        <h3 className="transition-color rounded-b-xl p-4 text-brand duration-1000 ease-out hover:bg-[rgba(0,0,0,7%)]">
          Show More{" "}
        </h3>
      </div>
    </div>
  );
};
