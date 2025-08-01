import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
    async session({ session }) {
        if (session)
            return session
    },
    async signIn({ profile }) {
        return profile
    },
    callbacks: () => {
        console.log('callback')
    }
})

export { handler as GET, handler as POST }