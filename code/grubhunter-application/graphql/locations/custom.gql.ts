import gql from 'graphql-tag';

export const typeCustomDefs = gql`
    directive @cacheControl(maxAge: Int) on FIELD_DEFINITION | OBJECT
    type LocationType @cacheControl(maxAge: 86400) {
        address: String!
        zipcode: String!
        borough: String!
        cuisine: String!
        grade: String! @cacheControl(maxAge: 60)
        name: String!
        on_wishlist: [String]! @cacheControl(maxAge: 60)
        location_id: String!
    }
`;
