import { pool } from "../DB/DB.js";
import bcrypt from "bcrypt";
import { SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import calendar from "node-calendar"

export const createGastoDiario = async (req, res) => {
  const { nombre, desc, monto } = req.body;
  if (!nombre || !desc || !monto)
    return res.status(400).json({ message: "Faltan datos" });
  if (parseFloat(monto) <= 0)
    return res.status(400).json({ message: "Gasto invalido" });
  console.log(calendar.weekday(2022, 11, 25))
};
