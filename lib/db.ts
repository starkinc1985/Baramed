import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL!;

if (!MONGODB_URI) throw new Error("DATABASE_URL is not defined");

const globalForMongoose = globalThis as unknown as {
  mongooseConn?: typeof mongoose;
  mongoosePromise?: Promise<typeof mongoose>;
};

export async function connectDB(): Promise<typeof mongoose> {
  if (globalForMongoose.mongooseConn) return globalForMongoose.mongooseConn;
  if (!globalForMongoose.mongoosePromise) {
    globalForMongoose.mongoosePromise = mongoose.connect(MONGODB_URI);
  }
  globalForMongoose.mongooseConn = await globalForMongoose.mongoosePromise;
  return globalForMongoose.mongooseConn;
}
