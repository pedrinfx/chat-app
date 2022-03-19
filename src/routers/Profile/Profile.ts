import { GetMeController } from '@controllers/Profile/GetMe';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { Router } from 'express';
const router = Router();

router.get('/', ensureAuthenticated, GetMeController);

export default router;
