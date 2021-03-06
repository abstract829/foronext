import { useRouter } from "next/router";
import { useContext } from "react";
import { date } from "yup";
import { ForumContext } from "../../context/forum/ForumContext";

const ForumCard = ({ post }) => {
  const router = useRouter();
  const { parseCategory } = useContext(ForumContext);
  const dateParse = (date) => {
    return date.slice(0, 10);
  };
  return (
    <>
      {post && (
        <div
          onClick={() => router.push(`/forum/${post.id}`)}
          className="px-4 py-2 mb-4 shadow cursor-pointer bg-slate-50"
        >
          <h3 className="text-xl font-semibold text-violet-500">
            {post.title}
          </h3>
          <div className="flex justify-between mt-2">
            <span className="font-medium text-violet-400">
              {parseCategory(post.category)}
            </span>
            <span className="font-medium text-violet-400">
              {dateParse(post.createdat)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ForumCard;
