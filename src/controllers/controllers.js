import userModel from "../models/user.js";

const User = new userModel();

export default class UserController {
  async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await User.createUser(userData);
      if (user) {
        res.status(201).send({ message: "User created successfully" });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUser(req, res) {
    try {
      const userId = req.params.userId; // Assuming user ID is passed as a route parameter
      const user = await User.getUserById(userId);
      if (!user) {
        return res.status(404).send(user);
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.userId; // Assuming user ID is passed as a route parameter
      const userData = req.body;
      const user = await User.updateUser(userId, userData);
      if (user) {
        return res
          .status(404)
          .send({ message: " User updated successfully", data: user });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.userId; // Assuming user ID is passed as a route parameter
      const user = await User.deleteUser(userId);
      if (user) {
        return res.status(404).send(user);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
