import { CreateMessageController } from '@controllers/Message/CreateMessage';
import { GetAllMessagesController } from '@controllers/Message/GetAllMessages';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { Router } from 'express';
const router = Router();

router.post('/create', ensureAuthenticated, CreateMessageController);
router.get('/all', GetAllMessagesController);

export default router;
