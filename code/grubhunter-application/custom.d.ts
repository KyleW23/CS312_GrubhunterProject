import mongooseImport from 'mongoose';
import NextAuth, { DefaultSession } from 'next-auth';

declare global {
    var mongoose: {
        conn: typeof mongooseImport | null;
        promise: Promise<typeof mongooseImport> | null;
    };
}

declare module 'next-auth' {
    interface Session {
        user: {
            fdlst_private_userId: string | null | undefined;
        } & DefaultSession['user'];
    }
}
