import axios from "axios";

const dev = "http://localhost:3000/";
const prod = "https://foronext.netlify.app";
const postsApi = axios.create({
  baseURL: `${prod}/api/posts`,
});
export const getAllPosts = async () => {
  const { data } = await postsApi.get();
  return data;
};
export const createPost = async (post) => {
  const { data } = await postsApi.post("/", post);
  return data;
};
export const delPost = async (id) => {
  const { data } = await postsApi.delete(`/${id}`);
  return data;
};
export const delComment = async (id) => {
  const { data } = await postsApi.delete(`/comments/${id}`);
  return data;
};
export const createComment = async (comment) => {
  const { data } = await postsApi.post("/comments/create", comment);
  return data;
};
export const getThisPostComments = async (id) => {
  const { data } = await postsApi.post(`/comments`, { postid: id });
  return data;
};
