import { AuthenticateUserService } from '@services/Auth/AuthenticateUser';
import { Request, Response } from 'express';

async function AuthenticateUserController(
    request: Request,
    response: Response
) {
    const { code } = request.body;

    try {
        const service = await AuthenticateUserService(code);

        response.status(200).json(service);
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}

export { AuthenticateUserController };
