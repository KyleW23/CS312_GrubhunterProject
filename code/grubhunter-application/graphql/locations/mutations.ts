import {
    addUserToWishlist,
    deleteUserFromWishlist,
    findById,
} from '@/mongoose/locations/services';

export interface MutationInterface {
    location_id: string;
    user_id: string;
}

export const mutationResolvers = {
    Mutation: {
        addUserToWishlist: async (
            _: unknown,
            param: MutationInterface,
            context,
        ) => {
            await addUserToWishlist(param.location_id, param.user_id);
            return [await findById({ location_id: param.location_id })];
        },
        deleteUserFromWishlist: async (
            _: unknown,
            param: MutationInterface,
            context,
        ) => {
            await deleteUserFromWishlist(param.location_id, param.user_id);
            return [await findById({ location_id: param.location_id })];
        },
    },
};
