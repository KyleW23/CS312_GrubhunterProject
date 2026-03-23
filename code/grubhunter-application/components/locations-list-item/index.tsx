import Link from 'next/link';
import { locationType } from '@/mongoose/locations/schema';
import 'components/locations-list-item/index.module.css';

interface PropsInterface {
    location: locationType;
}

const LocationsListItem = (props: PropsInterface) => {
    return (
        <ul>
            <li>
                <Link href={'/location/:' + props.location.location_id}>
                    <div>
                        <h2>{props.location.name}</h2>
                        <p>Cuisine: {props.location.cuisine}</p>
                        <p>Borough: {props.location.borough}</p>
                    </div>
                </Link>
            </li>
        </ul>
    );
};

export default LocationsListItem;
