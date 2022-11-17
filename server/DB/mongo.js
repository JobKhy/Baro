import mongoose from "mongoose";
import {MONGO_URI} from "../config.js";

try {
  console.log("Connecting to MongoDB...");
  console.log(MONGO_URI);
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  }).then(()=>console.log("MongoDB connected"));
} catch (error) {
  console.log(error);
}