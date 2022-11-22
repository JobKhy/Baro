import {join} from "path";
import {__public} from "../index.js"

export const sendfile = (req, res, next) => {
  const originalUrl = req.originalUrl;
  if (originalUrl.startsWith('/api')) {
    next();
  } else {
    res.sendFile(join(__public, "index.html"));
  }
}