import mongoose from "mongoose";
import config from "../config/index.js";

const connectDB = async () => {
  return mongoose
    .connect(config.db.DB_URI)
    .then(() => {
      console.log("Database Connected!");
    })
    .catch((error) => console.log(error));
};

export default connectDB;
