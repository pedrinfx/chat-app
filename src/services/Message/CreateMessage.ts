import prisma from '@prisma';
import { io } from '@app';
import { HTTPError } from '@errors/HTTPError';

async function CreateMessageService(
    _message: string,
    userId: string,
    chatId: string
) {
    if (
        !(await prisma.chat.findFirst({
            where: {
                id: chatId,
            },
        }))
    ) {
        throw new HTTPError('chatId.notfound', 404);
    }

    const message = await prisma.message.create({
        data: {
            text: _message,
            chatId,
            userId,
        },
        include: {
            Chat: {
                include: {
                    users: true,
                },
            },
            author: true,
        },
    });

    const messageInfo = {
        text: message.text,
        created_at: message.created_at,
        author: message.author,
    };

    for (let i = 0; i < message.Chat.users.length; i++) {
        const user = message.Chat.users[i];

        if (user && user.currentSocketId) {
            io.to(user.currentSocketId).emit('new_message', messageInfo);
        }
    }

    return message;
}

export { CreateMessageService };
