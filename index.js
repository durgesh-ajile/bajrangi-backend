import express from "express";
import dotenv from "dotenv";
const app = express();
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(fileName);
import connectDB from "./ConnectDB/connectDB.js";
import BlogRoute from "./Routes/BlogRoute.js";
import commentRoute from "./Routes/CommentRoute.js";
import cors from 'cors';

dotenv.config({ path: path.resolve(__dirname + "/config.env") });

connectDB()
  .then((res) => {
    console.log("database successfully connected");
  })
  .catch((err) => {
    console.log("something went wrong with connecting to database" + err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/api", BlogRoute);
app.use("/api", commentRoute)
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
}); 
