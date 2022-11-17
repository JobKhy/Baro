import { createPool } from "mysql2/promise";
// import {
//     DB_HOST,
//     DB_USER,
//     DB_PASSWORD,
//     DB_NAME,
// } from "./config.js";

export const pool = createPool({
    host: "us-east.connect.psdb.cloud",
    user: "m6x6c9fhdwixaaf9m7zl",
    password: "pscale_pw_duHpFqZlyLYpZdDDNIyVSB6aPpT9pqbDw4U3Td4uKD1",
    database: "baro",
    connectionLimit: 10000,
    ssl: {
        rejectUnauthorized: false
    }
});
