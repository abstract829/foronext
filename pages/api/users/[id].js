import { db } from "../../../dbconfig/config";

const getUserById = async (req, res) => {
  const { id } = req.query;
  try {
    const resp = await db.query("SELECT * FROM users WHERE id =$1", [id]);
    res.json({
      ok: true,
      user: resp.rows[0],
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: "error en la db",
    });
  }
};

const userRequests = (req, res) => {
  switch (req.method) {
    case "GET":
      getUserById(req, res);
      break;

    default:
      res.json({
        msg: "INVALID METHOD",
      });
      break;
  }
};

export default userRequests;
