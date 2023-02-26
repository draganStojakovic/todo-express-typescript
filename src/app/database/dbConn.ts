import mongoose from "mongoose";
import * as dotenv from "dotenv";

export const connectDB = async () => {
  dotenv.config();
  const DB = process.env.DB_CONN || "";
  if (DB == "") {
    console.log({ error: "Couldn't read .env file." });
    return;
  }
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(DB);
    console.log("Database connection established.");
  } catch (e) {
    console.log({ error: e.message });
  }
};
