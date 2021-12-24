import { db } from "../../../dbconfig/config";
const createPosts = async (req, res) => {
  const { title, body, createdby, category } = req.body;
  try {
    await db.query(
      "INSERT INTO posts(title, body, createdby, createdat, category) VALUES ($1, $2, $3, now(),$4)",
      [title, body, createdby, category]
    );
    res.json({
      ok: true,
      msg: "Post creado correctamente",
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: "error en la db",
    });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const resp = await db.query("SELECT * FROM posts");
    res.json({
      ok: true,
      posts: resp.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: "error en la db",
    });
  }
};

const postRequests = (req, res) => {
  switch (req.method) {
    case "GET":
      getAllPosts(req, res);
      break;
    case "POST":
      createPosts(req, res);
      break;
    default:
      res.json({
        ok: false,
        msg: "INVALID METHOD",
      });
      break;
  }
};

export default postRequests;
