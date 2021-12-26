import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/router";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "../../context/auth/AuthContext";
const Header = () => {
  const router = useRouter();
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const { logedUser } = useContext(AuthContext);
  return (
    <>
      <header className="fixed top-0 w-full px-8 py-4 font-bold uppercase shadow text-violet-500 bg-slate-50">
        <AiOutlineMenu
          onClick={() => setToggleMobileMenu((prev) => !prev)}
          className="w-8 h-8 cursor-pointer sm:hidden"
        />
        {toggleMobileMenu && (
          <div className="mt-2 bg-slate-50 sm:hidden">
            <nav>
              <ul className="flex flex-col gap-2">
                <li
                  className="cursor-pointer"
                  onClick={() => router.push("/forum")}
                >
                  Forum
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() =>
                    logedUser && router.push(`/profile/${logedUser.id}`)
                  }
                >
                  Profile
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => {
                    localStorage.clear();
                    router.push("/auth/login");
                  }}
                >
                  Logout
                </li>
              </ul>
            </nav>
          </div>
        )}

        <nav className="hidden h-8 max-w-5xl mx-auto sm:block">
          <ul className="flex justify-between gap-2">
            <li
              className="cursor-pointer"
              onClick={() =>
                logedUser && router.push(`/profile/${logedUser.id}`)
              }
            >
              Profile
            </li>
            <li
              className="cursor-pointer"
              onClick={() => router.push("/forum")}
            >
              Forum
            </li>

            <li
              className="cursor-pointer"
              onClick={() => {
                localStorage.clear();
                router.push("/auth/login");
              }}
            >
              Logout
            </li>
          </ul>
        </nav>
      </header>
      <div className="mb-16"></div>
    </>
  );
};

export default Header;
