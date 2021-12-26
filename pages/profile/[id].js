import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import SharedLayout from "../../components/SharedLayout/SharedLayout";
import { UsersContext } from "../../context/users/UsersContext";

const profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState();
  const { getUserById } = useContext(UsersContext);
  useEffect(() => {
    if (id) {
      getUserById(id).then((data) => setUser(data));
    }
  }, [id]);
  return (
    <SharedLayout>
      {user && (
        <>
          <div className="max-w-3xl mx-4 shadow mt-28 md:mx-auto bg-slate-50">
            <div className="px-8 py-4 mt-4 mb-8">
              <h2 className="text-2xl font-semibold text-violet-500">
                {user.firstname}'s profile
              </h2>
              <div className="p-4 mt-8 shadow bg-slate-100 text-violet-500">
                <span className="block mb-4">
                  Full name: {user.firstname} {user.lastname}
                </span>
                <span className="block mb-4">E-mail: {user.email}</span>
                <span className="block mb-4">Total posts created: to do</span>
                <span className="block mb-4">
                  Total comments created: to do
                </span>
              </div>
            </div>
          </div>
          <div
            onClick={() => router.push("/forum")}
            className="mb-24 font-semibold text-center cursor-pointer text-violet-400"
          >
            Back to forum
          </div>
        </>
      )}
    </SharedLayout>
  );
};

export default profile;
