import { pool } from "../DB/DB.js";
import bcrypt from "bcrypt";
import { SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const createGastoDiario = async (req, res) => {
  moment.locale("es");
  const today = moment().add(1, "days").format("YYYY-MM-DD");
  const from_date = moment().startOf("week").format("YYYY-MM-DD");
  const to_date = moment().endOf("week").format("YYYY-MM-DD");
  console.log({
    today: today.toString(),
    from_date: from_date.toString(),
    to_date: to_date.toString(),
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
      [rows1[0].semId, "2022-11-18"]
    );
    console.log(resultDay)
    if (resultDay.length > 0) {
      const [insertDiario] = await pool.query(
        "insert into diarios(diaName, diaDescription, diaAmount, dayId) values(?,?,?,?)",
        [nombre, desc, monto, resultDay[0].dayId]
      );
      console.log(insertDiario);
      if (insertDiario) {
        return res.status(200).json({
          message: "gasto agregado exitosmaente",
        });
      }
    } else if (resultDay.length === 0) {
      const [insertDay] = await pool.query(
        "insert into day (dayDate, semId) values(?, ?);",
        ["2022-11-18", rows1[0].semId]
      );
      console.log(["2022-11-18", rows1[0].semId])
      console.log(insertDay);
      if (!insertDay) {
        return res.status(400).json({ message: "No se pudo crear day con semana pero sin day" });
      }
      const [insertDiario] = await pool.query(
        "insert into diarios(diaName, diaDescription, diaAmount, dayId) values(?, ?, ?, ?);",
        [nombre, desc, monto, insertDay.insertId]
      );
      console.log(insertDiario);
      if (insertDiario) {
        return res.status(200).json({ message: "gasto creado exitosamente" });
      }
    }
  }
};
export const getGastos = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ message: "Token de acceso no válido" });
  }
  const { id } = jwt.verify(token, SECRET);
  if (!id) {
    return res.status(400).json({ message: "Token de acceso no válido" });
  }
  const [rows] = await pool.query(
    "select * from semanas where usuId = ? order by semStart desc limit 1;",
    [id]
  );
  if (rows.length === 0) {
    return res.status(400).json({ message: "No hay semanas aun" });
  }
  const { semId } = rows[0];
  const [rows1] = await pool.query("select * from day where semId =?;", [
    semId,
  ]);
  if (rows1.length === 0) {
    return res.status(400).json({ message: "No hay dias aquí" });
  }
  const finalGastos = [];
  rows1.forEach(async (e, i) => {
    const [tmpRow] = await pool.query(
      "select * from diarios where dayId = ?;",
      [e.dayId]
    );
    if (tmpRow) {
      finalGastos.push(tmpRow[0]);
    }
  });
  if (!finalGastos) {
    return res.status(400).json({ message: "No hay gastos aun " });
  }
  return res.status(200).json({ message: "gastos exitosamente", finalGastos });
};
