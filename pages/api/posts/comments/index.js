import { db } from "../../../../dbconfig/config";

const getCommentsByPostId = async (req, res) => {
  const { postid } = req.body;
  try {
    const resp = await db.query("SELECT * FROM comments WHERE idpost = $1", [
      postid,
    ]);
    res.json({
      ok: true,
      comments: resp.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: "error en la db",
    });
  }
};

const commentsRequests = (req, res) => {
  switch (req.method) {
    case "POST":
      getCommentsByPostId(req, res);
      break;

    default:
      res.json({
        msg: "INVALID METHOD",
      });
      break;
  }
};

export default commentsRequests;
