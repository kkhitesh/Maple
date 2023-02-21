import { LoadingPost } from "../components/LoadingPost";
import { Post } from "../components/Post";
import { Suggestions } from "../components/Suggestions";

const postDetails = {
  username: "John Doe",
  userImg: "https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=maple",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  img: "https://source.unsplash.com/random",
};

export const Home = () => {
  return (
    <div className="flex w-full">
      <div className="w-2/3 overflow-y-scroll border-2">
        <h1 className="sticky top-0 z-10 border-b-2 bg-white p-3 text-xl font-bold">
          Home
        </h1>
        <Post
          id={"1"}
          username={postDetails.username}
          userImg={postDetails.userImg}
          content={postDetails.content}
          img={postDetails.img}
        />
        <LoadingPost />
        <LoadingPost />
      </div>
      <Suggestions />
    </div>
  );
};
