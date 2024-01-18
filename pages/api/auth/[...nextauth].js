import NextAuth from "next-auth";
import CredentialsProvired from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvired({
      // this method will run when recieved login request
      async authorize(credentials) {
        let client;

        try {
          client = await connectToDatabase();
        } catch (error) {
          res
            .status(500)
            .json({ message: "Could not connect to the database." });
          return;
        }

        let user;
        try {
          user = await client.db().collection("users").findOne({
            email: credentials.email,
          });
        } catch (error) {
          client.close();
          throw new Error(
            error.message || `User ${credentials.email} not found!`
          );
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
