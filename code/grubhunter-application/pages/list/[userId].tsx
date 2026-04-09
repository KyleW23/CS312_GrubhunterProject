import { locationType } from '@/mongoose/locations/schema';
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    NextPage,
} from 'next';
import dbConnect from '@/middleware/db-connect';
import { findAllByWishlist } from '@/mongoose/locations/services';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import LocationsList from '@/components/locations-list';

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    let locations: locationType[] | null;

    try {
        await dbConnect();
        const { userId } = context.params as { userId: string };
        locations = await findAllByWishlist({ on_wishlist: userId });

        return {
            props: {
                locations: JSON.stringify(locations),
                userId,
            },
        };
    } catch {
        return { notFound: true };
    }
};

const Wishlist: NextPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
    const locationsJson = props.locations;
    const locations: locationType[] = JSON.parse(locationsJson);

    const { data: session } = useSession();

    return (
        <>
            <Head>
                <title>Wishlist Locations</title>
            </Head>
            <main>
                {session?.user.fdlst_private_userId === props.userId && (
                    <>
                        <div>
                            <h1>Wishlist for {session?.user.name}</h1>
                        </div>
                        <LocationsList locations={locations} />
                    </>
                )}
            </main>
        </>
    );
};

export default Wishlist;
