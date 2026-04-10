import { JWT } from 'next-auth/jwt';
import { GraphQLError } from 'graphql';

interface paramInterface {
    location_id: string;
    user_id: string;
}

interface contextInterface {
    token: JWT;
}

const authGuard = (
    params: paramInterface,
    context: contextInterface,
): boolean | Error => {
    if (!context || !context.token || !context.token.fdlst_private_userId) {
        return new GraphQLError('User is not authenticated', {
            extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 500 },
            },
        });
    }

    if (context.token.fdlst_private_userId !== params.user_id) {
        return new GraphQLError('User is not authorized', {
            extensions: {
                code: 'UNAUTHORIZED',
                http: { status: 500 },
            },
        });
    }

    return true;
};

export default authGuard;
