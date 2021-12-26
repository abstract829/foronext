import { db } from "../../../dbconfig/config";
import { generarJWT } from "../../../services/users";
export default async function verifyUser(req, res) {
  const { email, password } = req.body;
  try {
    const resp = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (resp.rows.length > 0) {
      if (resp.rows[0].password === password) {
        const token = await generarJWT(resp.rows[0].id, resp.rows[0].firstname);
        res.json({
          ok: true,
          user: resp.rows[0],
          token,
        });
      } else {
        res.json({
          ok: false,
          msg: "Invalid password",
        });
      }
    } else {
      res.json({
        ok: false,
        msg: "El email no existe",
      });
    }
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
}
