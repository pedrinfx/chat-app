import prisma from '@prisma';

async function updateSocketId(userId: string, socketId: string) {
    await prisma.user.update({
        where: {
            id: userId,
        },

        data: {
            currentSocketId: socketId,
        },
    });
}

export { updateSocketId };
