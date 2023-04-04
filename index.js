import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import {
  addUser,
  adminTampilBooking,
  adminTampilUSerData,
  bookingUser,
  changePp,
  deleteAkun,
  getPembayaran,
  loginAdmin,
  loginUser,
  logoutAkun,
  me,
  postPembayaran,
  tampilData,
  updateAkun,
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
app.put("/api/updateakun", updateAkun);
app.delete("/api/deleteakun", deleteAkun);
app.get("/api/logout", logoutAkun);
app.post("/api/loginadmin", loginAdmin);
app.get("/api/adminuserdata", adminTampilUSerData);
app.get("/api/adminbooking", adminTampilBooking);

app.listen(3000, () => console.log("Server sedang berjalan..."));