import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import verifyToken, { verifyAdmin } from '../middlewares/verify-token';

const router = Router();

router.get('/v1/me', verifyToken, AccountController.getMe);
router.get('/v1/list', verifyAdmin, AccountController.listAccount);
router.patch(
  '/v1/assign-admin/:id',
  verifyAdmin,
  AccountController.assignAdmin,
);

export const accountRoutes = router;
