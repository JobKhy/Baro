import { join, dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const __public = join(__dirname, "../client/dist/assets/uploads");

const storage = multer.diskStorage({
  destination: join(__public, "PFP"),
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}.${file.originalname.split(".").at(-1)}`
    );
  },
});

export default multer({
  dest: join(__public, "PFP"),
  storage,
});
