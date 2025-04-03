import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import verifyToken, { verifyAdmin } from '../middlewares/verify-token';

const router = Router();

router.get('/v1/category/new', verifyToken, AccountController.getMe);

export const productRoutes = router;
