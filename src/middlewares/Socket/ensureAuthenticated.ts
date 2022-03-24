import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { verifyToken } from '@utils/verifyToken';
import { updateSocketId } from '@utils/updateSocketId';

export async function ensureAuthenticated(
    socket: Socket,
    next: (err?: ExtendedError | undefined) => void
) {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error('token.invalid'));

    const result = verifyToken(token);

    if (result) {
        await updateSocketId(result, socket.id);

        return next();
    } else {
        return next(new Error('token.expired'));
    }
}
