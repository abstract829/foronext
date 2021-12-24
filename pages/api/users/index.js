import { db } from "../../../dbconfig/config";
import { generarJWT } from "../../../services/users";
const getAllUsers = async (req, res) => {
  try {
    const resp = await db.query("SELECT * FROM users");
    res.json({
      ok: true,
      users: resp.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: "Error en la db",
    });
  }
};
const createUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const verify = await db.query("SELECT * FROM users WHERE email =$1", [
      email,
    ]);
    if (verify.rows.length > 0) {
      res.json({
        ok: false,
        msg: "El email ya esta registrado",
      });
    } else {
      await db.query(
        "INSERT INTO users(firstname,lastname,email,password) VALUES($1,$2,$3,$4)",
        [firstname, lastname, email, password]
      );
      const resp = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      const token = await generarJWT(resp.rows[0].id, resp.rows[0].firstname);
      res.json({
        ok: true,
        msg: "Usuario creado correctamente",
        user: resp.rows[0],
        token,
      });
    }
  } catch (error) {
    res.json({
      ok: false,
      msg: "Error en la db",
    });
  }
};
export default function usersRequests(req, res) {
  switch (req.method) {
    case "GET":
      getAllUsers(req, res);
      break;
    case "POST":
      createUser(req, res);
      break;
    default:
      res.json({
        msg: "INVALID METHOD",
      });
      break;
  }
}
