import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
const Register = () => {
  const router = useRouter();
  const { createUser } = useContext(AuthContext)
  const handleRegister = async(user) => {
      console.log(user)
    const valid = await createUser(user)
    if(valid){
        router.push('/forum')
    }else{
        console.log('ERROR REGISTRANDO AL USUARIO')
    }
  }
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
          email: Yup.string().required("Email required").email("That doesn't looks like a email"),
          password: Yup.string().required("Password required").min(6,'Min length is 6 characters').max(16,'Max length is 16 characters'),
          password2: Yup.string().required("Please repeat password").min(6,'Min length is 6 characters').max(16,'Max length is 16 characters'),
        })}
      >
        {(formik) => (
          <Form>
            <div className="mx-4 my-4 rounded bg-zinc-200">
              <div className="flex flex-col px-4 py-4">
              <label className="block mt-2">First name</label>
                <Field type="text" name="firstname" className="h-8 px-2 mt-2 rounded" />
                <span className="text-sm text-red-700">
                  <ErrorMessage name="firstname" />
                </span>
                <label className="block mt-2">Last name</label>
                <Field type="text" name="lastname" className="h-8 px-2 mt-2 rounded" />
                <span className="text-sm text-red-700">
                  <ErrorMessage name="lastname" />
                </span>
                <label className="block mt-2">Email</label>
                <Field type="text" name="email" className="h-8 px-2 mt-2 rounded" />
                <span className="text-sm text-red-700">
                  <ErrorMessage name="email" />
                </span>
                <label className="block mt-2">Password</label>
                <Field type='password' name="password" className="h-8 px-2 mt-2 rounded" />
                <span className="text-sm text-red-700">
                  <ErrorMessage name="password" />
                </span>
                <label className="block mt-2">Repeat password</label>
                <Field type='password' name="password2" className="h-8 px-2 mt-2 rounded" />
                <span className="text-sm text-red-700">
                  <ErrorMessage name="password2" />
                </span>
                <button type='submit'
                  className="py-2 mt-8 text-white rounded bg-zinc-500 font-md"
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
        className="font-semibold text-center cursor-pointer text-zinc-400"
      >
        Go Login
      </div>
    </>
  );
};

export default Register;
