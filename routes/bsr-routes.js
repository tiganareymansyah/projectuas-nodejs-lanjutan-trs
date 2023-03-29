import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { client } from "../postgresql.js";

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

export async function bookingUser(req, res) {
    const mulaiJam = req.body.mulaiJam.replace("T", " ");
    const akhirJam = req.body.akhirJam.replace("T", " ");
    const changeToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    const dataBooking = await client.query("SELECT * FROM booking");
    client.query(
        `INSERT INTO booking (nama_lengkap, berapa_orang, ruangan, mulai_jam_berapa, akhir_jam_berapa, nomor_hp, id_user) VALUES 
            ('${req.body.namaLengkap}', 
            ${req.body.berapaOrang},
            '${req.body.ruangan}',
            '${mulaiJam}',
            '${akhirJam}',
            '${req.body.nomorHp}',
            ${changeToken.id_user})
        `
    );
    res.send("Pembookingan berhasil");

    
    // dataBooking.rows.forEach(data => {
    //     if(mulaiJam > data['akhir_jam_berapa'] || akhirJam < data['mulai_jam_berapa']) {
    //         client.query(
    //             `INSERT INTO booking (nama_lengkap, berapa_orang, ruangan, mulai_jam_berapa, akhir_jam_berapa, nomor_hp, id_user) VALUES 
    //                 ('${req.body.namaLengkap}', 
    //                 ${req.body.berapaOrang},
    //                 '${req.body.ruangan}',
    //                 '${mulaiJam}',
    //                 '${akhirJam}',
    //                 '${req.body.nomorHp}',
    //                 ${changeToken.id_user})
    //             `
    //         );
    //         res.send("Pembookingan berhasil");
    //     }
    //     else {
    //         res.send("Pembookingan gagal");
    //     }
    // });
};