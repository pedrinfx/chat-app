import { CreateMessageService } from '@services/Message/CreateMessage';
import { Request, Response } from 'express';

async function CreateMessageController(request: Request, response: Response) {
    const { message } = request.body;
    const { userId } = request;

    try {
        const service = await CreateMessageService(message, userId);

        response.status(200).json(service);
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}

export { CreateMessageController };
