import express from "express";
import { PORT } from "./config.js";

import cors from "cors";

import pruebaRoutes from "./routes/prueba.routes.js";
import usersRoutes from "./routes/users.routes.js";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors())

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
const __public = join(__dirname, "../client/dist");
app.use(express.static(__public));

app.use("/api", pruebaRoutes);
app.use("/api", usersRoutes);

app.listen(PORT, () => {
  console.log(
`Server listening on port ${PORT}`
  );
});

