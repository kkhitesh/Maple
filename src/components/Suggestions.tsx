import { BiSearch } from "react-icons/bi";

const RecProfile = () => {
  return (
    <div className="p-4 flex justify-between items-center transition-color ease-out duration-1000 hover:bg-[rgba(0,0,0,7%)]">
      <div className="flex gap-5">
        <div className="h-12 w-12 bg-brand rounded-full"></div>
        <div>
          <h1 className="font-semibold">John Doe</h1>
          <p>@john</p>
        </div>
      </div>
      <div className="p-2 px-5 bg-gray-800 text-white rounded-full">Follow</div>
    </div>
  );
};

export const Suggestions = () => {
  return (
    <div className="p-4 w-1/3 mr-10">
      <div className="flex justify-around items-center ">
        <div className="flex items-center gap-3 w-full px-4 py-3 bg-[rgba(0,0,0,5%)] rounded-full">
          <BiSearch className="text-2xl text-[rgba(0,0,0,40%)]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none"
          />
        </div>
      </div>
      <div className="bg-[rgba(0,0,0,3%)] w-full rounded-xl mt-4">
        <h2 className="text-xl font-bold px-4 py-2 ">Who to Follow</h2>
        <RecProfile />
        <RecProfile />
        <RecProfile />
        <h3 className="p-4 text-brand transition-color ease-out duration-1000 hover:bg-[rgba(0,0,0,7%)] rounded-b-xl">
          Show More{" "}
        </h3>
      </div>
    </div>
  );
};
