import { useContext } from "react/cjs/react.development";
import { AuthContext } from "../../context/auth/AuthContext";
import { useState } from "react";
import { ForumContext } from "../../context/forum/ForumContext";
const CreateComment = ({ idpost }) => {
  const { logedUser } = useContext(AuthContext);
  const { addComment } = useContext(ForumContext);
  const [body, setBody] = useState("");
  const submitComment = async () => {
    const toComment = {
      iduser: logedUser.id,
      idpost,
      body,
    };
    if (body.length > 200 || body.length < 5) {
    } else {
      await addComment(toComment);
    }
  };
  return (
    <div className="flex flex-col gap-4 px-8 py-4 mx-4 my-4 bg-gray-300 rounded">
      <span>make a comment (between 5 and 200 char )</span>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        name="body"
      />
      <button
        onClick={submitComment}
        className="block px-2 py-1 text-sm font-medium text-white bg-gray-500 rounded"
      >
        create
      </button>
    </div>
  );
};

export default CreateComment;
