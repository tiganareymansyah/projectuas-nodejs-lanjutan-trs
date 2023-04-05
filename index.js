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

app.use(cookieParser());

// app.use((req, res, next) => {
//   if (
//     req.path === "/" ||
//     req.path.endsWith(".css") ||
//     req.path.endsWith(".jpg") ||
//     req.path.endsWith(".png") ||
//     req.path.startsWith("foto")
//   ) {
//     next();
//   } else {
//     let authorized = false;
//     if (req.cookies.token) {
//       try {
//         jwt.verify(req.cookies.token, process.env.SECRET_KEY);
//         authorized = true;
//       } catch (err) {
//         res.setHeader("Cache-Control", "no-store");
//         res.clearCookie("token");
//       }
//     }
//     if (authorized) {
//       if (req.path.startsWith("/")) {
//         res.redirect("/beranda/beranda.html");
//       } else {
//         next();
//       }
//     } else {
//       if (req.path.startsWith("/")) {
//         next();
//       } else {
//         if (req.path.startsWith("/api")) {
//           res.status(401);
//           res.send("Anda harus login terlebih dahulu");
//         } else {
//           res.redirect("/");
//         }
//       }
//     }
//   }
// });

app.use(express.static("public"));

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
const upload = multer({ dest: "public/foto" });

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
