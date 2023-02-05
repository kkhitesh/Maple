import { LoadingPost } from "../components/LoadingPost";
import { Suggestions } from "../components/Suggestions";

export const Home = () => {
  return (
    <div className="flex w-full">
      <div className="w-2/3 overflow-y-scroll border-2">
        <h1 className="sticky top-0 z-10 border-b-2 bg-white p-3 text-xl font-bold">
          Home
        </h1>
        <LoadingPost />
        <LoadingPost />
        <LoadingPost />
      </div>
      <Suggestions />
    </div>
  );
};
