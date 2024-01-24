import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect("DATABASE_URL");

  return client;
}
