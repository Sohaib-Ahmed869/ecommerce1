// utils/db.js
import mongoose from "mongoose";

async function connectToDb() {
  if (mongoose.connections[0].readyState) return; // Use existing database connection if it exists
  // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/EcommerceTEABC");
  //   await mongoose.connect("mongodb+srv://i211114:pakistanzindabad@cluster0.rqmnh6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

export default connectToDb;
