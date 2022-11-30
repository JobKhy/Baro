import { pool } from "../DB/DB.js";
import bcrypt from "bcrypt";
import { SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const createGastoDiario = async (req, res) => {
  moment.locale("es");
  const today = moment().add(1, "days").format("YYYY-MM-DD");
  const from_date = moment()
    .startOf("week")
    .add(1, "days")
    .format("YYYY-MM-DD");
  const to_date = moment().endOf("week").add(1, "days").format("YYYY-MM-DD");
  console.log({
    today: today.toString(),
    from_date: from_date.toString(),
    to_date: to_date.toString(),
  });
  const { nombre, desc, monto, balance } = req.body;

  if (!nombre || !desc || !monto)
    return res.status(400).json({ message: "Faltan datos" });
  if (parseFloat(monto) <= 0)
    return res.status(400).json({ message: "Gasto invalido" });
  if (parseFloat(balance) < parseFloat(monto)) {
    return res.status(400).json({ message: "No tienes suficiente dinero" });
  }

  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ message: "Token de acceso no válido" });
  }
  const { id } = jwt.verify(token, SECRET);
  if (!id) {
    return res.status(400).json({ message: "Token de acceso no válido" });
  }

  const [updateing] = await pool.query(
    "UPDATE data_usuario SET datBalance = ? WHERE usuId = ?",
    [parseFloat(balance) - parseFloat(monto), id]
  );

  if (!updateing) {
    return res.status(400).json({ message: "Error al actualizar balance" });
  }

  const [rows1] = await pool.query(
    "select * from semanas where semStart = ? and usuId = ?;",
    [from_date, id]
  );
  if (rows1.length === 0) {
    const [insert1] = await pool.query(
      "insert into semanas (semStart, semEnd, usuId) values (?, ?, ?)",
      [from_date, to_date, id]
    );
    const { insertId } = insert1;
    const [insert2] = await pool.query(
      "insert into day(dayDate, semId) values(?, ?);",
      [today, insertId]
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
      [rows1[0].semId, today]
    );
    if (resultDay.length > 0) {
      const [insertDiario] = await pool.query(
        "insert into diarios(diaName, diaDescription, diaAmount, dayId) values(?,?,?,?)",
        [nombre, desc, monto, resultDay[0].dayId]
      );
      console.log("data insertdiario");
      console.log(insertDiario);
      if (insertDiario) {
        return res.status(200).json({
          message: "gasto agregado exitosmaente",
        });
      }
    } else if (resultDay.length === 0) {
      const [insertDay] = await pool.query(
        "insert into day (dayDate, semId) values(?, ?);",
        [today, rows1[0].semId]
      );
      if (!insertDay) {
        return res
          .status(400)
          .json({ message: "No se pudo crear day con semana pero sin day" });
      }
      const [insertDiario] = await pool.query(
        "insert into diarios(diaName, diaDescription, diaAmount, dayId) values(?, ?, ?, ?);",
        [nombre, desc, monto, insertDay.insertId]
      );
      console.log(insertDiario);
      if (insertDiario) {
        return res.status(200).json({
          message: "gasto creado exitosamente",
          newBalance: parseFloat(balance) - parseFloat(monto),
        });
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
  const [rows1] = await pool.query("select * from day where semId = ?;", [
    semId,
  ]);
  if (rows1.length === 0) {
    return res.status(400).json({ message: "No hay dias aún" });
  }
  const finalGastos = [];

  for (const e of rows1) {
    const [tmpRow] = await pool.query(
      "select * from diarios where dayId = ?;",
      [e.dayId]
    );
    if (tmpRow.length > 0) {
      tmpRow.forEach((e, i) => {
        console.log(finalGastos.push(e));
        console.log(finalGastos);
      });
    }
  }

  if (!finalGastos) {
    return res.status(400).json({ message: "No hay gastos aun " });
  }
  return res
    .status(200)
    .json({ message: "gastos exitosamente recuperados", gastos: finalGastos });
};
export const getSemanas = async (req, res) => {
  moment.locale("es");
  const today = moment().add(1, "days").format("YYYY-MM-DD");
  const from_date = moment()
    .startOf("week")
    .add(1, "days")
    .format("YYYY-MM-DD");
  const to_date = moment().endOf("week").add(1, "days").format("YYYY-MM-DD");
  console.log({
    today: today.toString(),
    from_date: from_date.toString(),
    to_date: to_date.toString(),
  });
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ message: "Token de acceso no válido" });
  }
  const { id } = jwt.verify(token, SECRET);
  if (!id) {
    return res.status(400).json({ message: "Token de acceso no válido" });
  }
  const [rows] = await pool.query(
    "select * from semanas where semStart = ? and usuId = ? order by semStart desc;",
    [from_date, id]
  );
  if (rows.length === 0) {
    return res.status(400).json({ message: "No hay semanas aun" });
  }
  const dates = [];

  const startDate = moment(rows[0].semStart).subtract(1, "day");
  const endDate = moment(rows[0].semEnd).subtract(1, "day");

  while (startDate.diff(endDate) <= 0) {
    dates.push(startDate.format("YYYY-MM-DD"));
    startDate.add(1, "days");
  }

  const finalDays = [];

  for (const e of dates) {
    console.log(moment(e).format("YYYY-MM-DD"));
    const [tmpRow] = await pool.query(
      "select * from day where dayDate = ? and semId = ?;",
      [moment(e).add(1, "days").format("YYYY-MM-DD"), rows[0].semId]
    );
    console.log(tmpRow);
  }

  return res.status(200).json({ message: "semanas recuperadas exitosamente" });
};
