import { useRouter } from "next/router";
import { useContext } from "react/cjs/react.development";
import { ForumContext } from "../../context/forum/ForumContext";

const ForumMenu = () => {
  const router = useRouter();
  const { filterPostsByCategory } = useContext(ForumContext);
  return (
    <>
      <div className="px-4 py-2 font-sm bg-zinc-300">
        <ul className="flex justify-between">
          <li onClick={() => filterPostsByCategory("4")}>All</li>
          <li onClick={() => filterPostsByCategory("1")}>Technology</li>
          <li onClick={() => filterPostsByCategory("2")}>Marketing</li>
          <li onClick={() => filterPostsByCategory("3")}>Design</li>
        </ul>
      </div>
      <div className="flex justify-end mt-4 mr-4">
        <button
          onClick={() => router.push("/forum/create")}
          className="px-2 py-1 text-white rounded bg-zinc-600"
        >
          Create a post
        </button>
      </div>
    </>
  );
};

export default ForumMenu;
