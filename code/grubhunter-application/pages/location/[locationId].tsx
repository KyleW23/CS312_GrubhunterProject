import LocationDetail from '@/components/location-details';
import { locationType } from '@/mongoose/locations/schema';
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    NextPage,
} from 'next';
import dbConnect from '@/middleware/db-connect';
import { findById } from '@/mongoose/locations/services';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    let location: locationType | null;

    try {
        await dbConnect();
        const { locationId } = context.params as { locationId: string };
        location = await findById({ location_id: locationId });

        if (location == null) {
            return { notFound: true };
        }

        return {
            props: {
                location: JSON.stringify(location),
            },
        };
    } catch {
        return { notFound: true };
    }
};

const LocationPage: NextPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
    const locationJson = props.location;
    const location: locationType = JSON.parse(locationJson);

    return (
        <>
            <Head>
                <title>{location.name}</title>
            </Head>
            <div>
                <h1>{location.name}</h1>
                <LocationDetail location={location} />
            </div>
        </>
    );
};

export default LocationPage;
