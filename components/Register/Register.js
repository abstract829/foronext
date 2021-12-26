import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const router = useRouter();
  const { createUser } = useContext(AuthContext);
  const handleRegister = async (user) => {
    if (user.password != user.password2)
      return Swal.fire("Error!", "Passwords doesn't match", "error");
    const valid = await createUser(user);
    if (valid) {
      router.push("/forum");
    } else {
      console.log("ERROR REGISTRANDO AL USUARIO");
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          password2: "",
        }}
        onSubmit={(values) => handleRegister(values)}
        validationSchema={Yup.object({
          firstname: Yup.string()
            .required("First name is required")
            .max(50, "Max length is 50 characters")
            .min(5, "Min length is 5 characters"),
          lastname: Yup.string()
            .required("First name is required")
            .max(50, "Max length is 50 characters")
            .min(5, "Min length is 5 characters"),
          email: Yup.string()
            .required("Email required")
            .email("That doesn't looks like a email"),
          password: Yup.string()
            .required("Password required")
            .min(6, "Min length is 6 characters")
            .max(16, "Max length is 16 characters"),
          password2: Yup.string()
            .required("Please repeat password")
            .min(6, "Min length is 6 characters")
            .max(16, "Max length is 16 characters"),
        })}
      >
        {(formik) => (
          <Form>
            <div className="max-w-xl mx-4 my-4 rounded shadow sm:mx-auto bg-slate-50">
              <div className="flex flex-col px-4 py-4">
                <label className="block mt-2 font-medium text-violet-400">
                  First name*
                </label>
                <Field
                  type="text"
                  name="firstname"
                  className="h-8 px-2 mt-2 rounded"
                />
                <span className="text-sm font-medium text-violet-500">
                  <ErrorMessage name="firstname" />
                </span>
                <label className="block mt-2 font-medium text-violet-400">
                  Last name*
                </label>
                <Field
                  type="text"
                  name="lastname"
                  className="h-8 px-2 mt-2 rounded"
                />
                <span className="text-sm font-medium text-violet-500">
                  <ErrorMessage name="lastname" />
                </span>
                <label className="block mt-2 font-medium text-violet-400">
                  Email*
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
                  Password*
                </label>
                <Field
                  type="password"
                  name="password"
                  className="h-8 px-2 mt-2 rounded"
                />
                <span className="text-sm font-medium text-violet-500">
                  <ErrorMessage name="password" />
                </span>
                <label className="block mt-2 font-medium text-violet-400">
                  Repeat password*
                </label>
                <Field
                  type="password"
                  name="password2"
                  className="h-8 px-2 mt-2 rounded"
                />
                <span className="text-sm font-medium text-violet-500">
                  <ErrorMessage name="password2" />
                </span>
                <button
                  type="submit"
                  className="py-2 mt-8 font-medium text-white uppercase bg-violet-500"
                >
                  Register
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div
        onClick={() => router.push("/auth/login")}
        className="font-semibold text-center cursor-pointer text-violet-400"
      >
        Already have an account? Login
      </div>
    </>
  );
};

export default Register;
