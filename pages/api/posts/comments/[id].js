import { db } from "../../../../dbconfig/config";
const deleteComment = async (req, res) => {
  const { id } = req.query;
  try {
    await db.query("DELETE FROM comments WHERE id = $1", [id]);
    res.json({
      ok: true,
      msg: "comment eliminado correctamente",
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
};

const commentRequests = (req, res) => {
  switch (req.method) {
    case "DELETE":
      deleteComment(req, res);
      break;

    default:
      break;
  }
};

export default commentRequests;
