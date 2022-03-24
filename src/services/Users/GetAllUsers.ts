import { HTTPError } from '@errors/HTTPError';
import prisma from '@prisma';

async function GetAllUsersService(offset: number = 0) {
    if (Number.isNaN(offset)) {
        throw new HTTPError('offset.nan', 400);
    }

    const users = await prisma.user.findMany({
        skip: offset * 10,
        take: 10,
    });

    return users;
}

export { GetAllUsersService };
