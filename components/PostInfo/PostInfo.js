import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react/cjs/react.development";
import { ForumContext } from "../../context/forum/ForumContext";
import { UsersContext } from "../../context/users/UsersContext";
import Coment from "../Coment/Coment";
import CreateComment from "../CreateComment/CreateComment";

const PostInfo = () => {
  const router = useRouter();
  const [post, setPost] = useState();
  const [author, setAuthor] = useState();
  const [comments, setComments] = useState();
  const [toggleUserProfile, setToggleUserProfile] = useState(false);
  const { posts, getPostComments } = useContext(ForumContext);
  const { getUserById } = useContext(UsersContext);
  const { id } = router.query;

  useEffect(() => {
    const getComments = async (thispostid) => {
      const query = await getPostComments(thispostid);
      setComments(query);
    };
    if (posts) {
      const postFilter = posts.filter((post) => post.id === id);
      setPost(postFilter[0]);
    }
    if (post) {
      getUserById(post.createdby).then((user) => setAuthor(user));
      getComments(post.id);
    }
  }, [posts, post]);
  return (
    <>
      {post && (
        <>
          <div
            onClick={() => router.push("/forum")}
            className="mt-20 font-semibold text-center text-zinc-400"
          >
            Go back
          </div>
          <div className="flex flex-col px-8 py-6 mx-4 mt-6 rounded bg-zinc-300">
            <h3 className="mb-8 text-2xl font-bold text-center">
              {post.title}
            </h3>

            <p className="text-justify break-words text-md">{post.body}</p>
            <div className="flex justify-between mt-8 text-sm">
              {author && (
                <span>
                  Posted by:
                  <span
                    onClick={() => setToggleUserProfile((prev) => !prev)}
                    className="ml-1 text-sm font-medium"
                  >
                    {author.firstname}
                  </span>
                  {toggleUserProfile && (
                    <span className="block py-1 text-xs text-center text-white bg-black rounded">
                      go profile
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
          <CreateComment idpost={post.id} />
          {comments &&
            comments.map((comment) => (
              <Coment
                key={comment.id}
                iduser={comment.iduser}
                body={comment.body}
              />
            ))}
        </>
      )}
      <div className="mb-24"></div>
    </>
  );
};

export default PostInfo;
