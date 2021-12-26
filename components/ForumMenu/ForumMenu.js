import { useContext, useState } from "react/cjs/react.development";
import { ForumContext } from "../../context/forum/ForumContext";

const ForumMenu = () => {
  const { filterPostsByCategory } = useContext(ForumContext);
  const [isActive, setIsActive] = useState("4");
  return (
    <>
      <div className="px-4 py-2 font-medium shadow sm:px-12 font-sm bg-slate-100 text-violet-500">
        <ul className="flex justify-between">
          <li
            className={
              isActive === "4"
                ? "px-4 cursor-pointer bg-violet-700 text-white rounded-full"
                : "px-4 cursor-pointer hover:bg-violet-700 hover:text-white hover:rounded-full"
            }
            onClick={() => {
              filterPostsByCategory("4");
              setIsActive("4");
            }}
          >
            All
          </li>
          <li
            className={
              isActive === "1"
                ? "px-4 cursor-pointer bg-violet-700 text-white rounded-full"
                : "px-4 cursor-pointer hover:bg-violet-700 hover:text-white hover:rounded-full"
            }
            onClick={() => {
              filterPostsByCategory("1");
              setIsActive("1");
            }}
          >
            Technology
          </li>
          <li
            className={
              isActive === "2"
                ? "px-4 cursor-pointer bg-violet-700 text-white rounded-full"
                : "px-4 cursor-pointer hover:bg-violet-700 hover:text-white hover:rounded-full"
            }
            onClick={() => {
              filterPostsByCategory("2");
              setIsActive("2");
            }}
          >
            Marketing
          </li>
          <li
            className={
              isActive === "3"
                ? "px-4 cursor-pointer bg-violet-700 text-white rounded-full"
                : "px-4 cursor-pointer hover:bg-violet-700 hover:text-white hover:rounded-full"
            }
            onClick={() => {
              filterPostsByCategory("3");
              setIsActive("3");
            }}
          >
            Design
          </li>
        </ul>
      </div>
    </>
  );
};

export default ForumMenu;
