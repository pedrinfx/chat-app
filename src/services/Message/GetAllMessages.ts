import prisma from '@prisma';

async function GetAllMessagesService() {
    const messages = await prisma.message.findMany({
        include: {
            user: true,
        },
    });

    return messages;
}

export { GetAllMessagesService };
