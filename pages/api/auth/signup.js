import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid input - password" });
    return;
  }

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Could not connect to the database." });
    return;
  }

  const db = client.db();
  // check for existing user
  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    client.close();
    res.status(422).json({ message: "User already exists" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  let result;
  try {
    result = await db
      .collection("users")
      .insertOne({ email: email, password: hashedPassword });
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Storing to database failed!" });
    return;
  }

  client.close();

  res.status(201).json({ message: "Created an user!" });
}
export default handler;
