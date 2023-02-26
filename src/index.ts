import App from "./app/app";
import * as dotenv from "dotenv";
import { connectDB } from "./app/database/dbConn";
import mongoose from "mongoose";

connectDB();

mongoose.connection.on("open", () => {
    const app = App();
    dotenv.config();
    const PORT = process.env.PORT;
    const server = app.listen(PORT, () => {
        console.log(`Running at: http://localhost:${PORT}/`);
    });
    server.on("error", console.error);
});
