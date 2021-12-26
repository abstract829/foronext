import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import ForumCard from "../../components/ForumCard/ForumCard";
import ForumMenu from "../../components/ForumMenu/ForumMenu";
import SharedLayout from "../../components/SharedLayout/SharedLayout";
import { ForumContext } from "../../context/forum/ForumContext";

const index = () => {
  const { posts, filteredPosts, filterPostsByCategory } =
    useContext(ForumContext);
  const [searchWord, setSearchWord] = useState("");
  const [page, setPage] = useState(0);
  const router = useRouter();
  useEffect(() => {
    filterPostsByCategory("4");
  }, []);
  const searchFilter = (arr) => {
    if (searchWord.trim() === "") return arr;
    return arr.filter((item) => item.title.includes(searchWord));
  };
  const pagination = (arr) => {
    return arr.slice(0, page + 4);
  };
  return (
    <SharedLayout>
      <ForumMenu />

      <div className="max-w-3xl mx-4 mt-4 mb-24 md:mx-auto">
        <div className="flex items-center justify-center mt-8">
          <span className="h-10 px-2 py-2 text-white rounded-l shadow bg-violet-500">
            Search
          </span>
          <input
            type="text"
            placeholder="search for a post"
            className="w-full h-10 p-1 rounded-r shadow outline-none bg-slate-50 "
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
        <div className="flex justify-end my-4">
          <button
            onClick={() => router.push("/forum/create")}
            className="px-2 py-1 font-medium text-white bg-violet-500"
          >
            create post
          </button>
        </div>
        <div>
          {filteredPosts
            ? pagination(searchFilter(filteredPosts)).map((post) => (
                <ForumCard key={post.id} post={post} />
              ))
            : posts &&
              pagination(searchFilter(posts)).map((post) => (
                <ForumCard key={post.id} post={post} />
              ))}
          <div
            onClick={() => setPage((prev) => prev + 3)}
            className="mb-24 font-semibold text-center cursor-pointer text-violet-400"
          >
            Load more
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};

export default index;
