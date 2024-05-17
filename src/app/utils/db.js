import mongoose from "mongoose";

async function connectToDb() {
  if (mongoose.connections[0].readyState) return; // Use existing database connection if it exists
  
  // Connection options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
  };

  // Connect to MongoDB
  await mongoose
    .connect(
      "mongodb+srv://sohaibsipra869:nvidia940MX@cluster0.dcrk8mp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      options
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
}

export default connectToDb;
