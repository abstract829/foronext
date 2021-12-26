import { db } from "../../../dbconfig/config";

const deletePost = async (req, res) => {
  const { id } = req.query;
  try {
    await db.query("DELETE FROM comments WHERE idpost =$1", [id]);
    await db.query("DELETE FROM posts WHERE id = $1", [id]);
    res.json({
      ok: true,
      msg: "Post eliminado correctamente",
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
};

const postRequests = (req, res) => {
  switch (req.method) {
    case "DELETE":
      deletePost(req, res);
      break;

    default:
      break;
  }
};

export default postRequests;
