import { pool } from "../DB/DB.js";
import bcrypt from "bcrypt";
import { SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const updateIngreso = async (req, res) => {
  const { ingreso } = req.body;
  if (!ingreso) return res.status(400).json({ message: "No ingreso" });
  if (parseFloat(ingreso) <= 0)
    return res.status(400).json({ message: "Ingreso invalido" });

  try {
    const { token } = req.cookies;
    if (!token) return res.status(400).json({ message: "No token" });
    const { id } = jwt.verify(token, SECRET);
    if (!id) return res.status(400).json({ message: "No id" });
    const [rows] = await pool.query(
      "SELECT * FROM data_usuario WHERE usuId = ?",
      [id]
    );
    if (!rows.length) return res.status(400).json({ message: "No rows" });
    const { datBalance } = rows[0];
    const newBalance = parseFloat(datBalance) + parseFloat(ingreso);
    const [rows2] = await pool.query(
      "UPDATE data_usuario SET datBalance = ? WHERE usuId = ?",
      [newBalance, id]
    );
    if (!rows2.affectedRows)
      return res.status(400).json({ message: "No rows2" });
    return res.status(200).json({ message: "Ingreso actualizado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
