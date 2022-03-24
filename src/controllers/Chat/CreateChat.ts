import { CreateChatService } from '@services/Chat/CreateChat';
import { Request, Response } from 'express';

async function CreateChatController(request: Request, response: Response) {
    const { userId } = request.body;
    const { userId: currentUserId } = request;

    try {
        const service = await CreateChatService(currentUserId, userId);

        response.status(200).json(service);
    } catch (error: any) {
        return response
            .status(error.status ?? 500)
            .json({ error: error.message });
    }
}

export { CreateChatController };
