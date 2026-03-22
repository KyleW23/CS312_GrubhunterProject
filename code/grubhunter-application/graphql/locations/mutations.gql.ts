import gql from 'graphql-tag';

export const typeMutationDefs = gql`
    type Mutation {
        addUserToWishlist(location_id: String, user_id: String): [LocationType]!

        deleteUserFromWishlist(
            location_id: String
            user_id: String
        ): [LocationType]!
    }
`;
