import express from "express";
import cookieParser from "cookie-parser";
import { addUser, bookingUser, loginUser } from "./routes/bsr-routes.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.post("/api/register", addUser);
app.post("/api/login", loginUser);
app.post("/api/booking", bookingUser);

app.listen(3000, () => console.log("Server sedang berjalan..."));