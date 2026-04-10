import { locationType } from '@/mongoose/locations/schema';
import styles from 'components/location-details/index.module.css';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Button from '../button';

interface PropsInterface {
    location: locationType;
}

interface WishlistInterface {
    locationId: string;
    userId: string | undefined | null;
}

const LocationDetail = (props: PropsInterface) => {
    const { data: session } = useSession();
    const [onWishlist, setOnWishlist] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userId = session?.user.fdlst_private_userId;
        if (userId && props.location.on_wishlist.includes(userId)) {
            setOnWishlist(true);
        }
    }, [session, props.location?.on_wishlist]);

    const wishlistAction = async ({
        locationId,
        userId,
    }: WishlistInterface) => {
        if (loading) return;
        setLoading(true);

        const addUserToWishlist = `
            mutation Mutation($locationId: String, $userId: String) {
                addUserToWishlist(location_id: $locationId, user_id: $userId) {
                    location_id
                }
            }
        `;

        const deleteUserFromWishlist = `
            mutation Mutation($locationId: String, $userId: String) {
                deleteUserFromWishlist(location_id: $locationId, user_id: $userId) {
                    location_id
                }
            }
        `;

        try {
            const mutation = onWishlist
                ? deleteUserFromWishlist
                : addUserToWishlist;

            const response = await fetch('/api/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { locationId: locationId, userId: userId },
                }),
            });

            const result = await response.json();
            if (result.errors) {
                console.log('GraphQL Error Detail:', result.errors[0].message);
            }

            if (response.ok) {
                setOnWishlist(!onWishlist);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {props.location !== null && (
                <div className={styles.root}>
                    <p>Address: {props.location.address}</p>
                    <p>Zipcode: {props.location.zipcode}</p>
                    <p>Borough: {props.location.borough}</p>
                    <p>Cuisine: {props.location.cuisine}</p>
                    <p>Grade: {props.location.grade}</p>
                    {session?.user.fdlst_private_userId !== null && (
                        <Button
                            clickHandler={() =>
                                wishlistAction({
                                    locationId: props.location.location_id,
                                    userId: session?.user.fdlst_private_userId,
                                })
                            }
                            disabled={loading}
                            variant={onWishlist ? 'outline' : 'blue'}
                        >
                            {onWishlist
                                ? 'Remove from Wishlist'
                                : 'Add to Wishlist'}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocationDetail;
