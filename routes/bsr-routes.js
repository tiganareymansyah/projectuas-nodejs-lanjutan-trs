import dotenv from "dotenv";
dotenv.config();

import express from "express";

import jwt from "jsonwebtoken";

import cookieParser from "cookie-parser";

import bcrypt from "bcryptjs";

import { client } from "../postgresql.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

export async function addUser(req, res) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password_, salt);
    client.query(
        `INSERT INTO user_data (username, email, password_, temtanglah, jenkel) VALUES
            ('${req.body.username}', '${req.body.email}', '${hash}', '${req.body.temtanglah}', '${req.body.jenkel}')`
    );
    res.send("Register berhasil");
};

export async function loginUser(req, res) {
    const cekEmail = await client.query(
        `SELECT * FROM user_data WHERE email = '${req.body.email}'`
    );
    if(cekEmail.rows.length > 0) {
        if(await bcrypt.compare(req.body.password_, cekEmail.rows[0].password_)) {
            const token = jwt.sign(cekEmail.rows[0], process.env.JWT_SECRET_KEY);
            res.cookie("token", token);
            res.send("Login berhasil");
        }
        else {
            res.status(401);
            res.send("Kata sandi salah");
        }
    }
    else {
        res.status(401);
        res.send("Username salah");
    }
};