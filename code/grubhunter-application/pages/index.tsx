import {
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType,
    NextPage,
    PreviewData,
} from 'next';
import dbConnect from '@/middleware/db-connect';
import { locationType } from '@/mongoose/locations/schema';
import { findAll } from '@/mongoose/locations/services';
import LocationsList from '@/components/locations-list';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async () => {
    let locations: locationType[] | [] = [];
    try {
        await dbConnect();
        locations = await findAll();
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            data: {
                locations: JSON.stringify(locations),
            },
        },
    };
};

const StartPage: NextPage = (
    props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
    const locationsJson = props.data.locations;
    const locations: locationType[] = JSON.parse(locationsJson);
    const pageTitle: string = 'Locations';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta
                    name='description'
                    content='Start Page Displaying All Locations'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
            </Head>
            <LocationsList locations={locations} />
        </>
    );
};

export default StartPage;
