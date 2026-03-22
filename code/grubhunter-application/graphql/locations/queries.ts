import { LocationById, WishlistFilter } from '@/mongoose/locations/custom';
import {
    findAll,
    findById,
    findAllByWishlist,
} from '@/mongoose/locations/services';

export const queryResolvers = {
    Query: {
        findAll: async () => {
            const locationData = await findAll();

            if (!locationData) return [];

            return locationData;
        },

        findById: async (_: unknown, param: LocationById) => {
            const locationData = await findById(param);

            if (!locationData) return [];

            return locationData;
        },

        findAllByWishlist: async (_: unknown, param: WishlistFilter) => {
            const locationData = await findAllByWishlist(param);

            if (!locationData) return [];

            return locationData;
        },
    },
};
