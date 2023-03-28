import express from "express";
import { addUser, loginUser } from "./routes/bsr-routes.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/api/register", addUser);
app.post("/api/login", loginUser);

app.listen(3000, () => console.log("Server sedang berjalan..."));