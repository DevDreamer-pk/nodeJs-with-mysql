import express from "express"; 
import UserController from "../controllers/controllers.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/create", userController.createUser);
userRouter.get("/:userId", userController.getUser);
userRouter.put("/update/:userId", userController.updateUser);
userRouter.delete("/delete/:userId", userController.deleteUser);

export default userRouter;

