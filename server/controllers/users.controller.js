import { pool } from "../DB/DB.js";
import bcrypt from "bcrypt";
import { SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import { __public } from "../index.js";
import { unlink } from "fs/promises";
import { join } from "path";

export const createUser = async (req, res) => {
  try {
    const { correo, contraseña, nombre, contraseñaConfirmada } = req.body;

    if (!correo || !contraseña || !nombre || !contraseñaConfirmada) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    if (contraseña.length > 32 || correo.length < 8) {
      return res.status(400).json({ message: "Datos inválidos" });
    }
    if (!correo.includes("@") || !correo.includes(".") || correo.length > 50) {
      return res.status(400).json({ message: "Correo inválido" });
    }
    if (nombre.length > 70 || nombre.length < 3) {
      return res.status(400).json({ message: "Nombre inválido" });
    }
    if (contraseña != contraseñaConfirmada) {
      return res
        .status(400)
        .json({ message: "Las contraseñas deben coincidir" });
    }

    const encryptedPassword = await bcrypt.hash(contraseña, 10);

    const [result] = await pool.query(
      "INSERT INTO usuario (usuEmail, usuPassword) VALUES (?, ?)",
      [correo, encryptedPassword]
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
    if (e.errno === 1062) {
      return res.status(400).json({ message: "El correo ya existe" });
    }
  }
};

export const getUser = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    if (!correo || !contraseña) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    const [result] = await pool.query(
      "SELECT * FROM usuario WHERE usuEmail = ?",
      [correo]
    );
    if (!result) {
      return res.status(400).json({ message: "Error al obtener usuario" });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    const { usuPassword } = result[0];
    const isPasswordCorrect = await bcrypt.compare(contraseña, usuPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const [rows2] = await pool.query(
      "SELECT * FROM data_usuario WHERE usuId = ?",
      [result[0].usuId]
    );
    if (!rows2) {
      return res
        .status(400)
        .json({ message: "Error al obtener datos extra del usuario" });
    }

    const user = {
      id: result[0].usuId,
      email: result[0].usuEmail,
      name: rows2[0].datName,
      photo: rows2[0].datPhoto,
      profile: rows2[0].datProfile,
      balance: rows2[0].datBalance,
    };

    const token = jwt.sign(user, SECRET);

    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    req.session.user = user;

    req.session.save((err) => {
      if (err) {
        return res.status(400).json({ message: "Error al guardar sesión" });
      }
      return res
        .status(200)
        .json({ message: "Sesión iniciada correctamente", user });
    });
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener usuario", error });
  }
};

export const checkSession = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(400).json({ message: "No hay sesión iniciada" });
    }
    const { id, email } = jwt.verify(req.cookies.token, SECRET);
    if (!id || !email) {
      return res.status(400).json({ message: "Sesión invalida" });
    }
    const [rows] = await pool.query(
      "SELECT * FROM data_usuario WHERE usuId = ?;",
      [id]
    );
    if (!rows) {
      return res.status(400).json({ message: "Error al obtener usuario" });
    }

    return res.status(200).json({
      message: "Sesión iniciada",
      user: {
        id,
        email,
        name: rows[0].datName,
        photo: rows[0].datPhoto,
        profile: rows[0].datProfile,
        balance: rows[0].datBalance,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error al obtener usuario", e });
  }
};
export const setProfile = async (req, res) => {
  try {
    const { id, profile } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Faltan datos (id)" });
    }

    if (!profile) {
      console.log("XD");
      const [isProfile] = await pool.query(
        "SELECT * FROM data_usuario WHERE usuId = ?",
        [id]
      );
      console.log(isProfile);
      if (!isProfile) {
        return res.status(400).json({ message: "Error al obtener usuario" });
      }
      if (isProfile[0].datProfile === 0) {
        console.log("XD en datprofile");
        return res.status(200).json({ message: "Ya tienes un perfil" });
      }
    }

    if (profile) {
      const [result] = await pool.query(
        "UPDATE data_usuario SET datProfile = ? WHERE usuId = ?",
        [profile, id]
      );
      if (!result) {
        return res.status(400).json({ message: "Error al actualizar perfil" });
      }
    }
    return res.status(200).json({ message: "Perfil actualizado" });
  } catch (e) {
    return res.status(400).json({ message: "Error al actualizar perfil", e });
  }
};
export const logout = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(400).json({ message: "No hay sesión iniciada" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).json({ message: "Error al cerrar sesión" });
      }
      res.clearCookie("token");
      return res.status(200).json({ message: "Sesión cerrada correctamente" });
    });
  } catch (e) {
    return res.status(400).json({ message: "Error al cerrar sesión", e });
  }
};
export const updatePhoto = async (req, res) => {
  console.log(req.file);
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ message: "No hay sesión iniciada" });
  }
  const { id } = jwt.verify(token, SECRET);
  if (!id) {
    return res.status(400).json({ message: "Sesión invalida" });
  }
  const { filename } = req.file;

  const [row] = await pool.query("select * from data_usuario where usuId = ?", [
    id,
  ]);
  if (!row) {
    return res.status(400).json({ message: "Error al obtener usuario" });
  }
  if (row[0].datPhoto) {
    unlink(join(__public, `assets/uploads/PFP/${row[0].datPhoto}`), (err) =>
      console.log(err)
    )
      .then(() => {
        console.log("Archivo eliminado");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("No hay foto para eliminar");
  }

  const [result] = await pool.query(
    "UPDATE data_usuario SET datPhoto = ? WHERE usuId = ?",
    [filename, id]
  );
  if (!result) {
    return res.status(400).json({ message: "Error al actualizar foto" });
  }

  return res.status(200).json({ message: "Foto actualizada", filename });
};
export const updateUser = async (req, res) => {
  const {name } = req.params;
  if(!name){
    return res.status(400).json({message: "Faltan datos (name)"})
  }
  const {token} = req.cookies;
  if(!token){
    return res.status(400).json({message: "No hay sesión iniciada"})
  }
  const {id} = jwt.verify(token, SECRET);
  if(!id){
    return res.status(400).json({message: "Sesión invalida"})
  }
  const [result] = await pool.query("UPDATE data_usuario SET datName = ? WHERE usuId = ?", [name, id]);
  if(!result){
    return res.status(400).json({message: "Error al actualizar nombre"})
  }
  return res.status(200).json({message: "Nombre actualizado"})
};
