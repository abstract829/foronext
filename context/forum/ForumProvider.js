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
    deletePost,
    deleteComment,
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
        deletePost,
        deleteComment,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};
