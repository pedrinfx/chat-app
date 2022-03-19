import { GetAllMessagesService } from '@services/Message/GetAllMessages';
import { Request, Response } from 'express';

async function GetAllMessagesController(request: Request, response: Response) {
    try {
        const service = await GetAllMessagesService();

        response.status(200).json(service);
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}

export { GetAllMessagesController };
