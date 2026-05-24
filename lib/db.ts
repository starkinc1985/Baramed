import mongoose from "mongoose";

const globalForMongoose = globalThis as unknown as {
  mongooseConn?: typeof mongoose;
  mongoosePromise?: Promise<typeof mongoose>;
};

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error("DATABASE_URL is not defined");

  if (globalForMongoose.mongooseConn) return globalForMongoose.mongooseConn;
  if (!globalForMongoose.mongoosePromise) {
    globalForMongoose.mongoosePromise = mongoose.connect(uri);
  }
  globalForMongoose.mongooseConn = await globalForMongoose.mongoosePromise;
  return globalForMongoose.mongooseConn;
}
