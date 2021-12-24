import { useRouter } from "next/router";
import { useContext } from "react/cjs/react.development";
import { ForumContext } from "../../context/forum/ForumContext";

const ForumCard = ({ post }) => {
  const router = useRouter();
  const { parseCategory } = useContext(ForumContext);
  return (
    <>
      {post && (
        <div
          onClick={() => router.push(`/forum/${post.id}`)}
          className="px-4 py-2 mb-4 rounded bg-zinc-300"
        >
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <div className="flex justify-between mt-2">
            <span className="font-medium text-md">
              {parseCategory(post.category)}
            </span>
            <span className="font-medium text-md">{post.createdat}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ForumCard;
