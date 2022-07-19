import { GetChatService } from '@services/Chat/GetChat';
import { Request, Response } from 'express';

async function GetChatController(request: Request, response: Response) {
    const { userId } = request.body;
    const { userId: currentUserId } = request;

    try {
        const service = await GetChatService(currentUserId, userId);

        response.status(200).json(service);
    } catch (error: any) {
        console.log(error);
        return response
            .status(error.status ?? 500)
            .json({ error: error.message });
    }
}

export { GetChatController };
