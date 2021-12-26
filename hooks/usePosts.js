import {
  createComment,
  createPost,
  delComment,
  delPost,
  getAllPosts,
  getThisPostComments,
} from "../services/posts";
import { useState } from "react";
export const usePosts = () => {
  const [posts, setPosts] = useState();
  const [filteredPosts, setFilteredPosts] = useState();
  const parseCategory = (category) => {
    switch (category) {
      case "1":
        return "Technology";
      case "2":
        return "Marketing";
      case "3":
        return "Design";
      default:
        return "No category";
    }
  };
  const filterPostsByCategory = (category) => {
    if (category === "4") return setFilteredPosts(posts);
    setFilteredPosts(posts.filter((post) => post.category === category));
  };
  const getPosts = async () => {
    const resp = await getAllPosts();
    setPosts(resp.posts);
  };
  const addPosts = async (post) => {
    const resp = await createPost(post);
    if (resp.ok) {
      console.log("Post creado correctamente");
    } else {
      console.log("Error creando el post");
    }
  };
  const deletePost = async (id) => {
    const resp = await delPost(id);
    if (resp.ok) {
      console.log("Se elimino correctamente");
    } else {
      console.log("error eliminando el post", resp.error);
    }
  };
  const deleteComment = async (id) => {
    const resp = await delComment(id);
    if (resp.ok) {
      console.log("Se elimino correctamente");
    } else {
      console.log("error eliminando el post", resp.error);
    }
  };
  const addComment = async (comment) => {
    const resp = await createComment(comment);
    if (resp.ok) {
      console.log("Comentario creado");
    } else {
      console.log("Error creando comentario");
    }
  };
  const getPostComments = async (idpost) => {
    const resp = await getThisPostComments(idpost);
    if (resp.ok) {
      return resp.comments;
    } else {
      console.log("error get commentarios en post:", idpost);
    }
  };
  return {
    getPosts,
    posts,
    addPosts,
    parseCategory,
    filterPostsByCategory,
    filteredPosts,
    addComment,
    getPostComments,
    deletePost,
    deleteComment,
  };
};
