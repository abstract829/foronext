import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const Login = () => {
  const router = useRouter();
  const { isValidUser } = useContext(AuthContext);
  const handleLogin = async ({ email, password }) => {
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
            <div className="max-w-xl mx-4 my-4 rounded shadow sm:mx-auto bg-slate-50">
              <div className="flex flex-col px-4 py-4">
                <img src="/user.png" className="w-24 mx-auto rounded-full" />
                <label className="block mt-2 font-medium text-violet-400">
                  Email
                </label>
                <Field
                  type="text"
                  name="email"
                  className="h-8 px-2 mt-2 rounded"
                />
                <span className="text-sm font-medium text-violet-500">
                  <ErrorMessage name="email" />
                </span>
                <label className="block mt-2 font-medium text-violet-400">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="h-8 px-2 mt-2 rounded"
                />
                <span className="text-sm font-medium text-violet-500">
                  <ErrorMessage name="password" />
                </span>
                <button
                  type="submit"
                  className="py-2 mt-8 font-medium text-white uppercase bg-violet-500"
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
        className="font-semibold text-center cursor-pointer text-violet-400"
      >
        Don't have an account ? Register
      </div>
    </>
  );
};

export default Login;
