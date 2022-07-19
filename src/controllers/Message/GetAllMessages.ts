import { GetAllMessagesService } from '@services/Message/GetAllMessages';
import { Request, Response } from 'express';

async function GetAllMessagesController(request: Request, response: Response) {
    let { offset } = request.body;
    const { chatId } = request.body;

    if (offset) {
        offset = parseInt(offset);
    }

    try {
        const service = await GetAllMessagesService(chatId, offset);

        response.status(200).json(service);
    } catch (error: any) {
        console.log(error);
        return response
            .status(error.status ?? 500)
            .json({ error: error.message });
    }
}

export { GetAllMessagesController };
