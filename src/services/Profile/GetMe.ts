import prisma from '@prisma';

async function GetMeService(userId: string) {
    const messages = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    });

    return messages;
}

export { GetMeService };
