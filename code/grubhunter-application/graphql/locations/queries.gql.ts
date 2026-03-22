import gql from 'graphql-tag';

export const typeQueryDefs = gql`
    type Query {
        findAll: [LocationType]!

        findById(location_id: String): LocationType!

        findAllByWishlist(on_wishlist: String): [LocationType]!
    }
`;
