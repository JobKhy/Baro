import { pool } from "../DB.js";

export const insertNewUser = async (req, res) => {
  try {
    const { correo, contraseña, nombre } = req.body;

    if (!correo || !contraseña || !nombre) {
      return res.status(400).send("Faltan datos");
    }
    if (contraseña.length > 32 || correo.length > 100) {
      return res.status(400).send("Datos inválidos");
    }
    if(!correo.includes("@") || !correo.includes(".")){
      return res.status(400).send("Correo inválido");
    }
    if(contraseña.length < 8){
      return res.status(400).send("Contraseña débil");
    }
    if(nombre.length > 70 || nombre.length < 3){
      return res.status(400).send("Nombre inválido");
    }
    

    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre_usu, correo_usu, contra_usu) VALUES (?, ?, ?)",
      [nombre, correo, contraseña]
    );
    res.json(result);
  } catch (e) {
    res.send("Error: " + e);
  }
};

export const getUserById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id_usu = ?", [
      req.params.id,
    ]);
    res.json(result[0][0]);
  } catch (e) {
    res.send("Error: " + e);
  }
};
