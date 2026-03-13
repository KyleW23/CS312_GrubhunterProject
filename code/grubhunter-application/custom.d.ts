import mongooseImport from 'mongoose';

declare global {
    var mongoose: {
        conn: typeof mongooseImport | null;
        promise: Promise<typeof mongooseImport> | null;
    };
}
