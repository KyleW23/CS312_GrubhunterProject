import { locationType } from '@/mongoose/locations/schema';
import styles from 'components/location-details/index.module.css';

interface PropsInterface {
    location: locationType;
}

const LocationDetail = (props: PropsInterface) => {
    return (
        <div>
            {props.location != null && (
                <div className={styles.root}>
                    <p>Address: {props.location.address}</p>
                    <p>Zipcode: {props.location.zipcode}</p>
                    <p>Borough: {props.location.borough}</p>
                    <p>Cuisine: {props.location.cuisine}</p>
                    <p>Grade: {props.location.grade}</p>
                </div>
            )}
        </div>
    );
};

export default LocationDetail;
