// utils/db.js
import mongoose from "mongoose";

async function connectToDb() {
  if (mongoose.connections[0].readyState) return; // Use existing database connection if it exists
  // Connect to MongoDB

  await mongoose
    .connect(
      "mongodb+srv://sohaibsipra869:nvidia940MX@cluster0.dcrk8mp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
}

export default connectToDb;
