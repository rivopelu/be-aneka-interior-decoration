import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import { OrderController } from '../controllers/order.controller';

const router = Router();
const controller = new OrderController();
router.get('/v1/destination', verifyToken, controller.getShippingDestination);
router.get('/v1/user/list', verifyToken, controller.getListOrderUser);
router.get('/v1/check-delivery-fee', verifyToken, controller.cekDeliveryFee);
router.get('/v1/detail/:id', verifyToken, controller.getDetailOrder);
router.post('/v1/create', verifyToken, controller.createOrder);
router.put('/v1/upload-payment-image/:id', verifyToken, controller.uploadPaymentImage);

export const orderRoutes = router;
