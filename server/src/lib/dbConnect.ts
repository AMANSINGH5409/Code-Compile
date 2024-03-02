import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "CodeCompile",
    });

    console.log("DB Connectionn Estasblished");
  } catch (error) {
    console.log("Error connecting to database.");
  }
};
