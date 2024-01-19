import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(406).json({ message: "Wrong request method!" });
    return;
  }

  let session;
  try {
    session = await getSession({ req: req });
  } catch (error) {
    res.status(511).json({ message: "Could not werify session!" });
    return;
  }

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    client.close();
    res
      .status(500)
      .json({ message: "Could not establish database connection!" });
    return;
  }

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    req.status(403).json({ message: "Invalid password!" });
    client.close();
    return;
  }

  const hashedNewPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedNewPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password has been changed." });
}

export default handler;
