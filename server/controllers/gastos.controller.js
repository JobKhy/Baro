import { pool } from "../DB/DB.js";
import bcrypt from "bcrypt";
import { SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import calendar from "node-calendar";
import moment from "moment/moment.js";

export const createGastoDiario = async (req, res) => {
  const today = moment().format("YYYY-MM-DD hh:mm:ss");
  const from_date = moment().startOf("week").format("YYYY-MM-DD hh:mm:ss");
  const to_date = moment().endOf("week").format("YYYY-MM-DD hh:mm:ss");
  console.log({
      today: today.toString(),
      from_date: from_date.toString(),
      to_date: to_date.toString()
  });
  const { nombre, desc, monto } = req.body;
  if (!nombre || !desc || !monto)
    return res.status(400).json({ message: "Faltan datos" });
  if (parseFloat(monto) <= 0)
    return res.status(400).json({ message: "Gasto invalido" });

  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ message: "Token de acceso no válido" });
  }
  const { id } = jwt.verify(token, SECRET);
  if (!id) {
    return res.status(400).json({ message: "Token de acceso no válido" });
  }

  const [rows1] = await pool.query(
    "select * from semanas where semStart = ? and usuId = ?;",
    [from_date.toString(), id]
  );
  if (rows1.length === 0) {
    const [insert1] = await pool.query(
      "insert into semanas (semStart, semEnd, usuId) values (?, ?, ?)",
      [from_date.toString(), to_date.toString(), id]
    );
    const { insertId } = insert1;
    const [insert2] = await pool.query(
      "insert into day(dayDate, semId) values(?, ?);",
      [today.toString(), insertId]
    );
    const insertDay = insert2.insertId;
    const [insert3] = await pool.query(
      "insert into diarios(diaName, diaDescription, diaAmount, dayId) values(?, ?, ?, ?);",
      [nombre, desc, monto, insertDay]
    );
    if (insert3) {
      return res.status(200).json({ message: "gasto agregado exitosmaente" });
    }
  } else if (rows1.length > 0) {
    const [resultDay] = await pool.query(
      "select * from day where semId = ? and dayDate = ?;",
      [rows1[0].semId, today.toString()]
    );
    console.log("creando dia con semana existente")
    if (resultDay.length > 0) {
      const [insertDiario] = await pool.query(
        "insert into diarios(diaName, diaDescription, diaAmount, dayId) values(?,?,?,?)",
        [nombre, desc, monto, resultDay[0].dayId]
      );
      if (insertDiario) {
        return res.status(200).json({
          message: "gasto agregado exitosmaente"
        });
      }
      console.log("creando gasto con dia existente")
    }else if(resultDay.length===0){
      const [insertDay] = await pool.query(
        "insert into day (dayDate, semId) values(?, ?);",
        [today.toString(), rows1[0].semId]
      )
      console.log("creando dia porque no existia aunque semana si")
      if(!insertDay){
        return res.status(400).json({ message: "Gasto invalido" });
      }
      const [insertDiario] = await pool.query(
        "insert into diarios(diaName, diaDescription, diaAmount, dayId) values(?, ?, ?, ?);",
        [nombre, desc, monto, insertDay.insertId]
      )
      if(insertDiario){
        return res.status(200).json({message: "gasto creado exitosamente"})
      }
    }
  }
};
