import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://nextjsblog:nextjsblog@nextjs-blog.rakgjgb.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
}
