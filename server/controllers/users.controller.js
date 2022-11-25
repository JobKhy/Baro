import { pool } from "../DB/DB.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { correo, contraseña, nombre, contraseñaConfirmada } = req.body;

    if (!correo || !contraseña || !nombre || !contraseñaConfirmada) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    if (contraseña.length > 32 || correo.length < 8) {
      return res.status(400).json({ message: "Datos inválidos" });
    }
    if (!correo.includes("@") || !correo.includes(".")) {
      return res.status(400).json({ message: "Correo inválido" });
    }
    if (nombre.length > 70 || nombre.length < 3) {
      return res.status(400).json("Nombre inválido");
    }
    if (contraseña != contraseñaConfirmada) {
      return res
        .status(400)
        .json({ message: "Las contraseñas deben coincidir" });
    }

    const [row1] = await pool.query("select usuEmail from usuario;");

    let bool = false;
    row1.forEach(async (e, i) => {
      if (!bool) {
        if (await bcrypt.compare(correo, e.usuEmail)) {
          console.log(e);
          bool = true;
          return;
        }
      }
    });
    if (bool) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    const encryptedPassword = await bcrypt.hash(contraseña, 10);
    const encryptedEmail = await bcrypt.hash(correo, 10);

    const [result] = await pool.query(
      "INSERT INTO usuario (usuEmail, usuPassword) VALUES (?, ?)",
      [encryptedEmail, encryptedPassword]
    );
    if (!result) {
      return res.status(400).json({ message: "Error al insertar usuario" });
    }

    const { insertId } = result;

    const [result2] = await pool.query(
      "insert into data_usuario (datName, usuId) values (?, ?);",
      [nombre, insertId]
    );
    if (!result2) {
      return res
        .status(400)
        .json({ message: "Error al insertar datos extra del usuarios" });
    }

    return res.status(200).json({ message: "Usuario creado exitosamente" });
  } catch (e) {
    res.send("Error: " + e);
  }
};

export const getUserById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id_usu = ?", [
      req.params.id
    ]);
    res.json(result[0][0]);
  } catch (e) {
    res.send("Error: " + e);
  }
};

export const checkSession = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id_usu =?", [
      req.params.id
    ]);
    res.json(result[0][0]);
  } catch (e) {
    console.log(e);
  }
};
