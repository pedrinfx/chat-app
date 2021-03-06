import axios from 'axios';
import prisma from '@prisma';
import { Secret, sign } from 'jsonwebtoken';

interface IAccessTokenResponse {
    // eslint-disable-next-line camelcase
    access_token: string;
}

interface IUserResponse {
    // eslint-disable-next-line camelcase
    avatar_url: string;
    login: string;
    id: number;
    name: string;
}

async function AuthenticateUserService(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: accessTokenResponse } =
        await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },

            headers: {
                Accept: 'application/json',
            },
        });

    const response = await axios.get<IUserResponse>(
        'https://api.github.com/user',
        {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`,
            },
        }
    );

    // eslint-disable-next-line camelcase
    const { login, id, avatar_url, name } = response.data;

    let user = await prisma.user.findFirst({
        where: {
            github_id: id,
        },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                github_id: id,
                login,
                avatar_url,
                name,
            },
        });
    }

    const token = sign(
        {
            user: {
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id,
            },
        },
        process.env.JWT_SECRET as Secret,
        {
            subject: user.id,
            expiresIn: '1d',
        }
    );

    return { token, user };
}

export { AuthenticateUserService };
