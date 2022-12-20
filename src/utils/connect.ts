import mongoose from "mongoose";
import config from "config";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbUri);
    console.log("DB Connection is successful");
  } catch (error) {
    console.error("Could not connect to DB");
    process.exit(1);
  }
}

export default connect;
