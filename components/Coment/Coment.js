import { useEffect, useState, useContext } from "react";
import { UsersContext } from "../../context/users/UsersContext";

const Coment = ({ iduser, body }) => {
  const { getUserById } = useContext(UsersContext);
  const [author, setAuthor] = useState();
  useEffect(() => {
    if (iduser) {
      getUserById(iduser).then((user) => setAuthor(user));
    }
  }, [iduser]);
  return (
    <div className="flex flex-col px-4 py-2 mx-4 mt-8 rounded bg-zinc-400">
      {author && (
        <span className="text-sm font-medium">
          {author.firstname} - {author.lastname}
        </span>
      )}
      {body && (
        <p className="px-4 py-4 text-justify break-words text-zinc-200">
          {body}
        </p>
      )}
    </div>
  );
};

export default Coment;
