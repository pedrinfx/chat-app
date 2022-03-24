import { GetAllUsersController } from '@controllers/Users/GetAllUsers';
import { Router } from 'express';
const router = Router();

router.get('/all', GetAllUsersController);

export default router;
