import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { ForumContext } from "../../context/forum/ForumContext";
import { UsersContext } from "../../context/users/UsersContext";
import Swal from "sweetalert2";
const Comment = ({ iduser, body, idcomment }) => {
  const router = useRouter();
  const { getUserById } = useContext(UsersContext);
  const { deleteComment } = useContext(ForumContext);
  const [author, setAuthor] = useState();
  const { logedUser } = useContext(AuthContext);
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
        await deleteComment(idcomment);
        await Swal.fire(
          "Deleted!",
          "Your comment has been deleted.",
          "success"
        );
        window.location.reload();
      }
    });
  };
  useEffect(() => {
    if (iduser) {
      getUserById(iduser).then((user) => setAuthor(user));
    }
  }, [iduser]);
  return (
    <div className="flex flex-col px-4 py-2 mx-4 mt-8 shadow bg-slate-50">
      {author && (
        <span className="flex justify-between text-sm font-medium uppercase text-violet-500">
          <span
            onClick={() => router.push(`/profile/${author.id}`)}
            className="cursor-pointer"
          >
            {author.firstname} - {author.lastname}
          </span>
          {logedUser.id === iduser && (
            <span
              className="w-6 h-6 cursor-pointer"
              onClick={() => deleteProccess()}
            >
              <img src="/icons/delete.png" />
            </span>
          )}
        </span>
      )}
      {body && (
        <p className="px-4 py-4 text-justify text-black break-words">{body}</p>
      )}
    </div>
  );
};

export default Comment;
