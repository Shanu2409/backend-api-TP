import mongoose from "mongoose";

const ConnectMongoDb = async (newConString) => {
  try {
    // Disconnect from the existing connection, if any
    await mongoose.disconnect();

    // Connect to the new MongoDB using the provided connection string
    const connect = await mongoose.connect(newConString);

    console.log(
      "MongoDB connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error(error);
  }
};

export default ConnectMongoDb;
