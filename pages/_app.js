import { AuthProvider } from "../context/auth/AuthProvider";
import { ForumProvider } from "../context/forum/ForumProvider";
import { UsersProvider } from "../context/users/UsersProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ForumProvider>
        <UsersProvider>
          <Component {...pageProps} />
        </UsersProvider>
      </ForumProvider>
    </AuthProvider>
  );
}

export default MyApp;
