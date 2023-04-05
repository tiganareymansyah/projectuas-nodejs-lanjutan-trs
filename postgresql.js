import dotenv from "dotenv";
dotenv.config();

import postgresql from "pg";

const { Client } = postgresql;

export const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

await client.connect();
console.log("Database terhubung...");
