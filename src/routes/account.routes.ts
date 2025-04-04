import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import verifyToken, { verifyAdmin } from '../middlewares/verify-token';

const router = Router();

router.get('/v1/me', verifyToken, AccountController.getMe);
router.get('/v1/list', verifyAdmin, AccountController.listAccount);
router.get(
  '/v1/shipping-address',
  verifyToken,
  AccountController.getShippingAddress,
);
router.post(
  '/v1/create-shipping-address',
  verifyToken,
  AccountController.createShippingAddress,
);
router.patch(
  '/v1/assign-admin/:id',
  verifyAdmin,
  AccountController.assignAdmin,
);

export const accountRoutes = router;
