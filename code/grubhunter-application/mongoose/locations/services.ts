import Location from './model';
import { LocationById, WishlistFilter } from './custom';
import { locationType } from './schema';

export async function findAll(): Promise<locationType[]> {
    try {
        return await Location.find();
    } catch (error) {
        console.log(error);
    }
    return [];
}

export async function findById(
    paramId: LocationById,
): Promise<locationType | null> {
    try {
        return await Location.findOne(paramId);
    } catch (error) {
        console.log(error);
    }
    return null;
}

export async function findAllByWishlist(
    paramId: WishlistFilter,
): Promise<locationType[] | null> {
    try {
        return await Location.find(paramId);
    } catch (error) {
        console.log(error);
    }
    return null;
}

export async function addUserToWishlist(
    paramLocationId: string,
    paramUserId: string,
): Promise<boolean> {
    try {
        await Location.updateOne(
            { location_id: paramLocationId },
            { $push: { on_wishlist: paramUserId } },
        );
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

export async function deleteUserFromWishlist(
    paramLocationId: string,
    paramUserId: string,
): Promise<boolean> {
    try {
        await Location.updateOne(
            { location_id: paramLocationId },
            { $pull: { on_wishlist: paramUserId } },
        );
    } catch (error) {
        console.log(error);
    }
    return false;
}
