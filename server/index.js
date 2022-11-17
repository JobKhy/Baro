//modules
import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
//env variables
import { PORT } from "./config.js";
//routes
import pruebaRoutes from "./routes/prueba.routes.js";
import usersRoutes from "./routes/users.routes.js";
//global
import "./DB/mongo.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const __public = join(__dirname, "../client/dist");
//middlewares
app.use(cors())
app.use(express.json());
app.use(express.static(__public));

//routes
app.use("/api", pruebaRoutes);
app.use("/api", usersRoutes);

app.listen(PORT, () => {
  console.log(
`Server listening on port ${PORT}`
  );
});

