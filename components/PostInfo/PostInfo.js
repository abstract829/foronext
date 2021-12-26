import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react/cjs/react.development";
import { AuthContext } from "../../context/auth/AuthContext";
import { ForumContext } from "../../context/forum/ForumContext";
import { UsersContext } from "../../context/users/UsersContext";
import Comment from "../Comment/Comment";
import CreateComment from "../CreateComment/CreateComment";
import Swal from "sweetalert2";
const PostInfo = () => {
  const router = useRouter();
  const [post, setPost] = useState();
  const [author, setAuthor] = useState();
  const [comments, setComments] = useState();
  const [page, setPage] = useState(0);
  const [toggleCommentBox, setToggleCommentBox] = useState(false);
  const { posts, getPostComments, deletePost } = useContext(ForumContext);
  const { getUserById } = useContext(UsersContext);
  const { logedUser } = useContext(AuthContext);
  const { id } = router.query;
  const deleteProccess = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#cccc",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePost(post.id);
        await Swal.fire("Deleted!", "Your post has been deleted.", "success");
        await router.push("/forum");
        window.location.reload();
      }
    });
  };
  const pagination = (arr) => {
    return arr.slice(0, page + 3);
  };
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
        <div className="max-w-3xl mx-4 mt-4 mb-24 md:mx-auto">
          <div
            onClick={() => router.push("/forum")}
            className="mt-20 font-semibold text-center cursor-pointer text-violet-400"
          >
            Back to forum
          </div>
          <div className="flex flex-col px-8 py-6 mx-4 mt-6 shadow bg-slate-50">
            <h3 className="flex justify-between mb-8 text-2xl font-bold text-center text-violet-500">
              {post.title}{" "}
            </h3>

            <p className="text-justify break-words text-md">{post.body}</p>
            <div className="flex justify-between mt-8 text-sm">
              {author && (
                <span>
                  Posted by:
                  <span
                    onClick={() => router.push(`/profile/${author.id}`)}
                    className="ml-1 text-sm font-medium uppercase cursor-pointer text-violet-500"
                  >
                    {author.firstname}
                  </span>
                </span>
              )}
              {author
                ? author.id === logedUser.id && (
                    <span
                      className="w-6 h-6 cursor-pointer "
                      onClick={() => deleteProccess()}
                    >
                      <img src="/icons/delete.png" />
                    </span>
                  )
                : ""}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setToggleCommentBox((prev) => !prev)}
              className="block px-2 py-1 mx-4 mt-4 text-sm text-white bg-violet-500 "
            >
              create comment
            </button>
          </div>
          <div className="flex justify-end">
            {toggleCommentBox && <CreateComment idpost={post.id} />}
          </div>
          {comments &&
            pagination(comments).map((comment) => (
              <Comment
                key={comment.id}
                iduser={comment.iduser}
                idcomment={comment.id}
                body={comment.body}
              />
            ))}
          <div
            onClick={() => setPage((prev) => prev + 2)}
            className="mt-4 mb-24 font-semibold text-center cursor-pointer text-violet-400"
          >
            Load more
          </div>
        </div>
      )}
      <div className="mb-24"></div>
    </>
  );
};

export default PostInfo;
