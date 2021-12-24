const jwt = require("jsonwebtoken");
import { generarJWT, JWT_SEED } from "../../../services/users";
import { db } from "../../../dbconfig/config";
const validarJWT = async (req, res) => {
  const token = req.headers["x-token"];
  if (!token) {
    return res.json({
      ok: false,
      msg: "error en el token",
    });
  }
  try {
    const { id, name } = jwt.verify(token, JWT_SEED);
    const resp = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    const newToken = await generarJWT(id, name);
    return res.json({
      ok: true,
      user: resp.rows[0],
      token: newToken,
    });
  } catch (error) {
    return res.json({
      ok: false,
      msg: "Token no válido",
    });
  }
  // TODO OK!
};

export default validarJWT;
