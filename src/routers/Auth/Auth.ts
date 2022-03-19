import { AuthenticateUserController } from '@controllers/Auth/AuthenticateUser';
import { Router } from 'express';
const router = Router();

router.post('/', AuthenticateUserController);
router.get('/github', (request, response) => {
    response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
});
router.get('/callback', (request, response) => {
    const { code } = request.query;

    return response.json({ code });
});

export default router;
