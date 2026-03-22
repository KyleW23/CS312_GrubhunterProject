import { typeCustomDefs } from './custom.gql';
import { typeQueryDefs } from './queries.gql';
import { typeMutationDefs } from './mutations.gql';
import gql from 'graphql-tag';

export const typeDefs = gql`
    ${typeCustomDefs}

    ${typeQueryDefs}

    ${typeMutationDefs}
`;
