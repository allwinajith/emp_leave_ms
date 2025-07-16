import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit:0
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error(" MySQL connection failed:", error);
    process.exit(1);
  }
})();

async function dbQuery(query, params = []) {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(query, params);
    return result;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}

export default dbQuery;