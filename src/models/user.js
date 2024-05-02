import { v4 as uuidv4 } from "uuid";
import DbConnection from "../../config/dbConnection.js";
const dbConnection = new DbConnection();

export default class User {
  async createUser(userData) {
    try {
      const createTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id VARCHAR(36) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    userType VARCHAR(50) NOT NULL
                )
            `;

      const query = "INSERT INTO users SET ?";

      const tableCreated = await this.query(createTableQuery);
      if (!tableCreated) {
        throw new Error("Error creating table");
      }

      const userId = uuidv4();
      userData.id = userId;

      const result = await this.query(query, userData);

      return result; // Return the result of the INSERT operation
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const query = "SELECT * FROM users WHERE id = ?";
      const result = await this.query(query, userId);
      if (result.length == 0) {
        return { message: "User not found" };
      }
      return result[0]; // Assuming the user ID is unique, return the first user found
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw error;
    }
  }

  async updateUser(userId, userData) {
    try {
      const query = "UPDATE users SET ? WHERE id = ?";
      const result = await this.query(query, [userData, userId]);
      return result; // Return the result of the UPDATE operation
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const query = "DELETE FROM users WHERE id = ?";
      const result = await this.query(query, userId);
      if (result.affectedRows == 0) {
        return { message: "User not found" };
      }
      return { message: "User deleted successfully", data: result }; // Return the result of the DELETE operation
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  async query(sql, values) {
    const connection = await dbConnection.getConnection();
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }
}
