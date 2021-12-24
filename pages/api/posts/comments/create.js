import { db } from "../../../../dbconfig/config";

const createComment = async (req, res) => {
  const { iduser, idpost, body } = req.body;
  try {
    await db.query(
      "INSERT INTO comments(iduser,idpost,body) VALUES($1,$2,$3)",
      [iduser, idpost, body]
    );
    res.json({
      ok: true,
      msg: "comentario creado correctamente",
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: "error en la db",
    });
  }
};

export default createComment;
