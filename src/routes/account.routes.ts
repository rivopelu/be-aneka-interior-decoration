import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import verifyToken from '../middlewares/verify-token';

const router = Router();

router.get('/v1/me', verifyToken, AccountController.getMe);
router.get('/v1/list', verifyToken, AccountController.listAccount);

export const accountRoutes = router;
