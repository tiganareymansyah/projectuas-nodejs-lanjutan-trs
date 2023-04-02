import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import {
  addUser,
  bookingUser,
  changePp,
  getPembayaran,
  loginUser,
  me,
  postPembayaran,
  tampilData,
} from "./routes/bsr-routes.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const upload = multer({dest: "public/foto"});

app.get("/api/me", me);
app.post("/api/register", addUser);
app.post("/api/login", loginUser);
app.post("/api/booking", bookingUser);
app.post("/api/postpembayaran", postPembayaran);
app.get("/api/getpembayaran", getPembayaran);
app.put("/api/changepp", upload.single("foto"), changePp);
app.get("/api/tampildata", tampilData);

app.listen(3000, () => console.log("Server sedang berjalan..."));