import { CreateChatController } from '@controllers/Chat/CreateChat';
import { GetChatController } from '@controllers/Chat/GetChat';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { Router } from 'express';
const router = Router();

router.post('/create', ensureAuthenticated, CreateChatController);
router.post('/get', ensureAuthenticated, GetChatController);

export default router;
