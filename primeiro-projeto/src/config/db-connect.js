import mongoose from "mongoose";

async function databaseConnect() {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.x2y52xl.mongodb.net/livraria`
  );
  return mongoose.connection;
}

export default databaseConnect;
