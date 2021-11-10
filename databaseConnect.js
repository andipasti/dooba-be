import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`DB connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(e);

    // try to reconnect to database
    setTimeout(async () => {
      await connectToDB();
    }, 10000);
  }
};
