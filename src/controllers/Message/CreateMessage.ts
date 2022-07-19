import { CreateMessageService } from '@services/Message/CreateMessage';
import { Request, Response } from 'express';

async function CreateMessageController(request: Request, response: Response) {
    const { message, chatId } = request.body;
    const { userId } = request;

    try {
        const service = await CreateMessageService(message, userId, chatId);

        response.status(200).json(service);
    } catch (error: any) {
        console.log(error);
        return response
            .status(error.status ?? 500)
            .json({ error: error.message });
    }
}

export { CreateMessageController };
