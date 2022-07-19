import { GetMeService } from '@services/Profile/GetMe';
import { Request, Response } from 'express';

async function GetMeController(request: Request, response: Response) {
    const { userId } = request;

    try {
        const service = await GetMeService(userId);

        response.status(200).json(service);
    } catch (error: any) {
        console.log(error);
        return response
            .status(error.status ?? 500)
            .json({ error: error.message });
    }
}

export { GetMeController };
