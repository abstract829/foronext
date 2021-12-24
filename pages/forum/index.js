import { useContext, useEffect } from "react";
import ForumCard from "../../components/ForumCard/ForumCard";
import ForumMenu from "../../components/ForumMenu/ForumMenu";
import SharedLayout from "../../components/SharedLayout/SharedLayout";
import { AuthContext } from "../../context/auth/AuthContext";
import { ForumContext } from "../../context/forum/ForumContext";

const index = () => {
  const { logedUser } = useContext(AuthContext);
  const { posts, filteredPosts } = useContext(ForumContext);

  return (
    <SharedLayout>
      <ForumMenu />
      <div className="mx-4 mt-4 mb-24">
        {logedUser && <span>logeduser : {logedUser.firstname}</span>}
        hi
        {filteredPosts
          ? filteredPosts.map((post) => <ForumCard key={post.id} post={post} />)
          : posts &&
            posts.map((post) => <ForumCard key={post.id} post={post} />)}
      </div>
    </SharedLayout>
  );
};

export default index;
