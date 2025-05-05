import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
let connection = async () => {
  try {
    let res = await mongoose.connect(process.env.MONGO_URL);
    console.log("DB JS connection");
  } catch (error) {
    console.log(error, "Connection db.js error");
  }
};
export default connection;
