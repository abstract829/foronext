import { useRouter } from "next/router";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "../../context/auth/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const Login = () => {
  const router = useRouter();
  const { isValidUser } = useContext(AuthContext);
  const handleLogin = async ({email,password}) => {
    const valid = await isValidUser(email, password);
    if (valid) {
      router.push("/forum");
    } else {
      console.log("ERROR O USER INVALIDO");
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          email: "email@email.com",
          password: "123456",
        }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={Yup.object({
          email: Yup.string().required("Email required"),
          password: Yup.string().required("Password required"),
        })}
      >
        {(formik) => (
          <Form>
            <div className="mx-4 my-4 rounded bg-zinc-200">
              <div className="flex flex-col px-4 py-4">
                <label className="block mt-2">Email</label>
                <Field type="text" name="email" className="h-8 px-2 mt-2 rounded" />
                <span className="text-sm text-red-700"><ErrorMessage name="email" /></span>
                <label className="block mt-2">Password</label>
                <Field name="password" className="h-8 px-2 mt-2 rounded" />
                <span className="text-sm text-red-700"><ErrorMessage name="password" /></span>
                <button
                    type='submit'
                  className="py-2 mt-8 text-white rounded bg-zinc-500 font-md"
                >
                  Login
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div
        onClick={() => router.push("/auth/register")}
        className="font-semibold text-center cursor-pointer text-zinc-400"
      >
        Go register
      </div>
    </>
  );
};

export default Login;
