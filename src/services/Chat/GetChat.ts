import { HTTPError } from '@errors/HTTPError';
import prisma from '@prisma';

async function GetChatService(currentUserId: string, userId: string) {
    if (!userId) throw new HTTPError('userId.required', 400);

    const chat = await prisma.chat.findFirst({
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

        include: {
            users: true,
            messages: {
                include: {
                    author: true,
                },
            },
        },
    });

    if (!chat) throw new HTTPError('chat.notfound', 404);

    return chat;
}

export { GetChatService };
