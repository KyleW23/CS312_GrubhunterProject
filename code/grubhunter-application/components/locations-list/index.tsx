import LocationsListItem from '../locations-list-item';
import { locationType } from '@/mongoose/locations/schema';
import styles from 'components/locations-list/index.module.css';

interface PropsInterface {
    locations: locationType[];
}

const LocationsList = (props: PropsInterface) => {
    return (
        <div className={styles.root}>
            {props.locations.map((location) => (
                <LocationsListItem
                    location={location}
                    key={location.location_id}
                />
            ))}
        </div>
    );
};

export default LocationsList;
