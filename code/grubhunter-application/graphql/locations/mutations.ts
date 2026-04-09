import {
    addUserToWishlist,
    deleteUserFromWishlist,
    findById,
} from '@/mongoose/locations/services';
import authGuard from '@/middleware/auth-guard';
import { JWT } from 'next-auth/jwt';

export interface MutationInterface {
    location_id: string;
    user_id: string;
}

interface contextInterface {
    token: JWT;
}

export const mutationResolvers = {
    Mutation: {
        addUserToWishlist: async (
            _: unknown,
            param: MutationInterface,
            context: contextInterface,
        ) => {
            const guard = authGuard(param, context);
            if (guard !== true) {
                return guard;
            }

            await addUserToWishlist(param.location_id, param.user_id);
            return [await findById({ location_id: param.location_id })];
        },
        deleteUserFromWishlist: async (
            _: unknown,
            param: MutationInterface,
            context: contextInterface,
        ) => {
            const guard = authGuard(param, context);
            if (guard !== true) {
                return guard;
            }

            await deleteUserFromWishlist(param.location_id, param.user_id);
            return [await findById({ location_id: param.location_id })];
        },
    },
};
