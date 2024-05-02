import dotenv from "dotenv";
dotenv.config();

import Express from "express";
import DbConnection from "./config/dbConnection.js";
import userRouter from "./src/routes/routes.js";
import bodyParser from "body-parser";

const dbConnection = new DbConnection();
const server = Express();
server.use(bodyParser.json());

server.use("/users", userRouter);

server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
    dbConnection.connect();
})