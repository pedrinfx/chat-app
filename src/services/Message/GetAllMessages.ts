import { HTTPError } from '@errors/HTTPError';
import prisma from '@prisma';

async function GetAllMessagesService(chatId: string, offset: number = 0) {
    if (Number.isNaN(offset)) {
        throw new HTTPError('offset.nan', 400);
    }

    if (!chatId) throw new HTTPError('chatId.required');

    const messages = await prisma.chat.findUnique({
        where: {
            id: chatId,
        },
        include: {
            messages: {
                skip: offset * 20,
                take: 20,
            },
        },
    });

    if (!messages) {
        throw new HTTPError('chatId.notfound', 404);
    }

    return messages.messages;
}

export { GetAllMessagesService };
