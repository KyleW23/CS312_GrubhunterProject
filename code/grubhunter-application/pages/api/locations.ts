import dbConnect from '@/middleware/db-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { locationType } from '@/mongoose/locations/schema';
import { findAll } from '@/mongoose/locations/services';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<locationType[]>,
) {
    try {
        await dbConnect();

        const locations: locationType[] = await findAll();

        res.status(200).json(locations);
    } catch (error) {
        console.log(error);
        res.status(500).json([]);
    }
}
