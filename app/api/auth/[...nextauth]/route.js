import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import User from "@/model/user";
import payment from "@/model/payment";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      
      if (account.provider === "google") {
        const client = await mongoose.connect(process.env.MONGODB_URI)
        const currentUser = await User.findOne({ email  : user.email })
        if(!currentUser){
          const newUser = await User({
            email: user.email, 
            username: user.email.split("@")[0]
            
          })
          await newUser.save()
         }
        
        return true
        }
      },
      async session({ session, user, token }) {
        await mongoose.connect(process.env.MONGODB_URI)
        const dbuser = await User.findOne({ email: session.user.email });
        session.user.name = dbuser.username;

      return session
    }
    }}
);

export { handler as GET, handler as POST }