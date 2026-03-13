import dbConnect from '@/middleware/db-connect';
import Location from '@/mongoose/locations/model';
import { NextApiRequest, NextApiResponse } from 'next';
import { locationType } from '@/mongoose/locations/schema';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<locationType[]>,
) {
    try {
        await dbConnect();

        const locations: locationType[] = await Location.find();

        res.status(200).json(locations);
    } catch (error) {
        console.log(error);
        res.status(500).json([]);
    }
}
