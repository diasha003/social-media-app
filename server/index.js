import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //
app.use(morgan("common"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    //место для хранения
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    //имя для загруженный файлов
    cb(null, file.originalname);
  },
});

//app.use(multer({ storage: storageConfig }).single("image"));

const PORT = process.env.PORT || 3003;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server port ${PORT}`));
  })
  .catch((error) => console.log(error));
