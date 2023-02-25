import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export const SearchBar = (data: any) => {
  const [filteredData, setFilteredData] = useState<any>([]);
  const [word, setWord] = useState<string>("");

  const searchUser = (e: any) => {
    const searchWord = e.target.value;
    setWord(searchWord);

    const newFilter = data.data.filter((value: any) => {
      return value
        .data()
        .username.toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWord("");
  };

  console.log(filteredData);

  return (
    <div className="flex flex-col items-center ">
      <div className="flex w-full items-center gap-3 rounded-full bg-[rgba(0,0,0,5%)] px-4 py-3">
        <BiSearch className="text-2xl text-[rgba(0,0,0,40%)]" />
        <input
          type="text"
          placeholder="Search"
          value={word}
          className="bg-transparent focus:outline-none"
          onChange={searchUser}
        />
        {filteredData.length != 0 && (
          <IoCloseSharp
            onClick={clearInput}
            className="cursor-pointer text-2xl text-[rgba(0,0,0,40%)]"
          />
        )}
      </div>
      {filteredData.length != 0 && (
        <div className="mt-2 max-h-52 w-full overflow-hidden overflow-y-auto shadow-md ">
          {filteredData.slice(0, 15).map((value: any) => {
            return (
              <Link to={`/profile/${value.data().id}`}>
                <div className="flex items-center gap-5 bg-[rgba(0,0,0,3%)] p-2 hover:bg-[rgba(0,0,0,7%)]">
                  <img
                    src={value.data().userImg}
                    className="h-8 w-8 rounded-full"
                    alt=""
                  />
                  <h1 className="font-semibold">{value.data().username}</h1>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
