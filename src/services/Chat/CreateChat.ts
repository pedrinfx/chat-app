import { HTTPError } from '@errors/HTTPError';
import prisma from '@prisma';

async function CreateChatService(currentUserId: string, userId: string) {
    if (!userId) throw new HTTPError('userId.required', 400);
    if (userId === currentUserId)
        throw new HTTPError('userId.cannotbeyou', 400);

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) throw new HTTPError('user.notfound', 404);

    if (
        await prisma.chat.findFirst({
            where: {
                users: {
                    none: {
                        AND: [
                            {
                                id: currentUserId,
                            },

                            {
                                id: userId,
                            },
                        ],
                    },
                },
            },
        })
    ) {
        throw new HTTPError('chat.alreadyexists', 400);
    }

    const chat = await prisma.chat.create({
        data: {
            users: {
                connect: [{ id: userId }, { id: currentUserId }],
            },
        },

        include: {
            messages: true,
            users: true,
        },
    });

    return chat;
}

export { CreateChatService };
