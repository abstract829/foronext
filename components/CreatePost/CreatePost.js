import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "../../context/auth/AuthContext";
import { ForumContext } from "../../context/forum/ForumContext";
const CreatePost = () => {
  const router = useRouter();
  const { addPosts } = useContext(ForumContext);
  const { logedUser } = useContext(AuthContext);
  const addPost = (values, resetForm) => {
    const newPost = {
      ...values,
      createdby: logedUser.id,
    };
    addPosts(newPost);
    //resetForm();
  };
  return (
    <>
      <Formik
        initialValues={{
          title: "",
          body: "",
          category: "",
        }}
        onSubmit={(values, { resetForm }) => addPost(values, resetForm)}
        validationSchema={Yup.object({
          title: Yup.string()
            .required("Field required")
            .min(6, "Title must be at least 6 characters")
            .max(50, "Title must be no more than 50 characters"),
          body: Yup.string()
            .required("Field required")
            .min(50, "Description must be at least 50 characters")
            .max(500, "Description must be no more than 500 characters"),
          category: Yup.string()
            .required("Field required")
            .not(["0"], "Field required"),
        })}
      >
        {() => (
          <Form>
            <div className="flex flex-col px-8 py-6 mx-4 mt-24 rounded bg-zinc-300">
              <h3 className="mb-8 text-2xl font-bold text-center">
                Create a new post
              </h3>
              <label className="block my-2">Title</label>
              <Field name="title" className="h-8 px-2 rounded" />
              <span className="text-sm font-medium text-gray-500">
                <ErrorMessage name="title" />
              </span>
              <label className="block mb-2">Description</label>
              <Field as="textarea" name="body" className="px-2 rounded" />
              <span className="text-sm font-medium text-gray-500">
                <ErrorMessage name="body" />
              </span>
              <label className="block my-2">Category</label>
              <Field as="select" name="category" className="h-8 px-2 rounded">
                <option value="0">Select your post category</option>
                <option value="1">Technology</option>
                <option value="2">Marketing</option>
                <option value="3">Design</option>
              </Field>
              <span className="text-sm font-medium text-gray-500">
                <ErrorMessage name="category" />
              </span>
              <button
                className="px-4 py-2 mt-8 font-medium text-white rounded bg-zinc-600"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div
        onClick={() => router.push("/forum")}
        className="mt-4 mb-24 font-semibold text-center text-zinc-400"
      >
        Go back
      </div>
    </>
  );
};

export default CreatePost;
