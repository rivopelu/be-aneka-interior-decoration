import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import { OrderController } from '../controllers/order.controller';

const router = Router();
const controller = new OrderController();
router.get('/v1/destination', verifyToken, controller.getShippingDestination);
router.get('/v1/check-delivery-fee', verifyToken, controller.cekDeliveryFee);

export const orderRoutes = router;
