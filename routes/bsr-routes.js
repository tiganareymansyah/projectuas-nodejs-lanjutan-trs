import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { client } from "../postgresql.js";

export async function me(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
  const tampilEmailPp = await client.query(
    `SELECT ud.email, bg.foto_profil FROM user_data ud, booking bg WHERE ud.id_user = ${user.id_user} AND bg.id_user = ${user.id_user}`
  );
  res.send(tampilEmailPp.rows[0]);
}

export async function addUser(req, res) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.password_, salt);
  client.query(
    `INSERT INTO user_data (username, email, password_, temtanglah, jenkel) VALUES
            ('${req.body.username}', '${req.body.email}', '${hash}', '${req.body.temtanglah}', '${req.body.jenkel}')`
  );
  res.send("Register berhasil");
}

export async function loginUser(req, res) {
  const cekEmail = await client.query(
    `SELECT * FROM user_data WHERE email = '${req.body.email}'`
  );
  if (cekEmail.rows.length > 0) {
    if (await bcrypt.compare(req.body.password_, cekEmail.rows[0].password_)) {
      const token = jwt.sign(cekEmail.rows[0], process.env.JWT_SECRET_KEY);
      res.cookie("token", token);
      res.send("Login berhasil");
    } else {
      res.status(401);
      res.send("Kata sandi salah");
    }
  } else {
    res.status(401);
    res.send("Username salah");
  }
}

export async function bookingUser(req, res) {
  const changeToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
  const dataBooking = await client.query("SELECT * FROM booking");
  let valid = true;

  dataBooking.rows.forEach(async (data) => {
    if (new Date(req.body.mulaiJam) < new Date(data.akhir_jam_berapa)) {
      valid = false;
      res.status(401);
      res.send("Pembookingan gagal");
    }
  });

  if (valid) {
    await client.query(
      `INSERT INTO booking (nama_lengkap, berapa_orang, ruangan, mulai_jam_berapa, akhir_jam_berapa, nomor_hp, id_user) VALUES
        ('${req.body.namaLengkap}',
        ${req.body.berapaOrang},
        '${req.body.ruangan}',
        '${req.body.mulaiJam}',
        '${req.body.akhirJam}',
        '${req.body.nomorHp}',
        ${changeToken.id_user})
      `
    );
    res.send("Pembookingan berhasil");
  }
}

export async function postPembayaran(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
  const idUserBooking = await client.query(
    `SELECT id_booking FROM booking WHERE id_user = ${user.id_user}`
  );
  await client.query(
    `INSERT INTO pembayaran (jam, pembayaran, id_booking) VALUES
      (${req.body.jamBooking}, ${req.body.bayar}, ${idUserBooking.rows[0].id_booking})
    `
  );
  res.send("Pembayaran berhasil diinsert");
}

export async function getPembayaran(_req, res) {
  const notaPembayaran = await client.query(
    `SELECT ud.id_user, email, bg.nama_lengkap, pn.jam, pembayaran FROM user_data ud, booking bg, pembayaran pn
      WHERE ud.id_user = bg.id_user AND pn.id_booking = bg.id_booking
    `
  );
  if (notaPembayaran) {
    res.send(notaPembayaran.rows[0]);
  }
}

export async function changePp(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
  const idUserBooking = await client.query(
    `SELECT id_booking FROM booking WHERE id_user = ${user.id_user}`
  );
  await client.query(
    `UPDATE booking SET foto_profil = '${req.file.filename}' WHERE id_booking = ${idUserBooking.rows[0].id_booking}`
  );
  res.send("Foto profil berhasil diubah");
}

export async function tampilData(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
  const tampilData = await client.query(
    `SELECT id_user, username, email, temtanglah, jenkel FROM user_data WHERE id_user = ${user.id_user}`
  );
  res.send(tampilData.rows[0]);
}

export async function updateAkun(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.updatePassword, salt);
  await client.query(
    `UPDATE user_data SET email = '${req.body.updateEmail}', password_ = '${hash}' WHERE id_user = ${user.id_user}`
  );
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.send("Akun berhasil diupdate");
}

export async function deleteAkun(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
  const idUserBooking = await client.query(
    `SELECT id_booking FROM booking WHERE id_user = ${user.id_user}`
  );
  await client.query(
    `DELETE FROM pembayaran WHERE id_booking = ${idUserBooking.rows[0].id_booking}`
  );
  await client.query(`DELETE FROM booking WHERE id_user = ${user.id_user}`);
  await client.query(`DELETE FROM user_data WHERE id_user = ${user.id_user}`);
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.send("Akun berhasil didelete");
}

export async function logoutAkun(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.send("Logout berhasil");
}

export async function loginAdmin(req, res) {
  if (req.body.email === "trs@gmail.com") {
    if (req.body.password_ === "2502") {
      res.send("Login berhasil");
    } else {
      res.status(401);
      res.send("Password salah");
    }
  } else {
    res.status(401);
    res.send("Email salah");
  }
}

export async function adminTampilUSerData(req, res) {
  const adminTampilUSerData = await client.query(
    `SELECT id_user, username, email, temtanglah, jenkel FROM user_data`
  );
  res.send(adminTampilUSerData.rows);
}

export async function adminTampilBooking(req, res) {
  const adminTampilBooking = await client.query(
    `SELECT id_booking, nama_lengkap, berapa_orang, mulai_jam_berapa, akhir_jam_berapa, nomor_hp, ruangan, id_user FROM booking`
  );
  res.send(adminTampilBooking.rows);
}

// // Route untuk file coba.html
// export async function cobaTampil(req, res) {
//   const tampilData = await client.query(
//     `SELECT username, email, temtanglah, jenkel FROM user_data`
//   );
//   res.json(tampilData.rows[0]);
// }
