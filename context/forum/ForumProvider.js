import { ForumContext } from "./ForumContext";
import { useEffect } from "react";
import { usePosts } from "../../hooks/usePosts";
export const ForumProvider = ({ children }) => {
  const {
    posts,
    getPosts,
    addPosts,
    parseCategory,
    filterPostsByCategory,
    filteredPosts,
    addComment,
    getPostComments,
  } = usePosts();

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <ForumContext.Provider
      value={{
        posts,
        addPosts,
        parseCategory,
        filterPostsByCategory,
        filteredPosts,
        addComment,
        getPostComments,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};
