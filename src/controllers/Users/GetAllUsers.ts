import { GetAllUsersService } from '@services/Users/GetAllUsers';
import { Request, Response } from 'express';

async function GetAllUsersController(request: Request, response: Response) {
    let { offset } = request.body;

    if (offset) {
        offset = parseInt(offset);
    }

    try {
        const service = await GetAllUsersService(offset);

        response.status(200).json(service);
    } catch (error: any) {
        return response
            .status(error.status ?? 500)
            .json({ error: error.message });
    }
}

export { GetAllUsersController };
