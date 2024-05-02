import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

export default class DbConnection {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }

  async getConnection() {
    return this.connection;
  }

  async connect() {
    try {
      await this.connection.connect();
      console.log("Connected to MySQL database");
    } catch (err) {
      console.error("Error connecting to MySQL database:", err);
      throw err;
    }
  }

  async close() {
    try {
      await this.connection.end();
      console.log("MySQL connection closed");
    } catch (err) {
      console.error("Error closing MySQL connection:", err);
      throw err;
    }
  }
}
