import GithubProvider from 'next-auth/providers/github';
import NextAuth from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'crypto';

const hash = (data: string) => {
    const hashedValue = createHash('sha256').update(data).digest('hex');
    return hashedValue;
};

const NextAuthHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
        throw new Error(
            'GITHUB_CLIENT_ID is not defined in environment variables',
        );
    }

    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    if (!clientSecret) {
        throw new Error(
            'GITHUB_CLIENT_SECRET is not defined in environment variables.',
        );
    }

    return NextAuth(req, res, {
        providers: [
            GithubProvider({
                clientId: clientId,
                clientSecret: clientSecret,
            }),
        ],
        callbacks: {
            async jwt({ token }) {
                if (token.email && !token.fdlst_private_userId) {
                    token.fdlst_private_userId = hash(token.email);
                }
                return token;
            },
            async session({ session }) {
                if (session.user.email && !session.user.fdlst_private_userId) {
                    session.user.fdlst_private_userId = hash(
                        session.user.email,
                    );
                }
                return session;
            },
        },
    });
};

export default NextAuthHandler;
