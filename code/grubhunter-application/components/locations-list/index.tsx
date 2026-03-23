import LocationsListItem from '../locations-list-item';
import 'components/locations-list/index.module.css';
import { locationType } from '@/mongoose/locations/schema';
import { NextComponentType } from 'next';

interface PropsInterface {
    locations: locationType[];
}

const LocationsList = (props: PropsInterface) => {
    return props.locations.map((location) => (
        <LocationsListItem location={location} key={location.location_id} />
    ));
};

export default LocationsList;
