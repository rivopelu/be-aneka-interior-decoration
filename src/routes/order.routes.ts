import { Router } from 'express';
import verifyToken, { verifyAdmin } from '../middlewares/verify-token';
import { OrderController } from '../controllers/order.controller';

const router = Router();
const controller = new OrderController();
router.get('/v1/admin/list', verifyAdmin, controller.getListOrderAdmin);
router.get('/v1/admin/report', verifyAdmin, controller.getOrderReport);
router.patch('/v1/user/confirm/:id', verifyToken, controller.confirmOrder);
router.put('/v1/admin/input-resi/:id', verifyAdmin, controller.inputResi);
router.put(
  '/v1/admin/approve-reject/:id',
  verifyAdmin,
  controller.approveRejectOrder,
);
router.get('/v1/admin/list', verifyToken, controller.getListOrderAdmin);
router.get('/v1/destination', verifyToken, controller.getShippingDestination);
router.get('/v1/user/list', verifyToken, controller.getListOrderUser);
router.get('/v1/check-delivery-fee', verifyToken, controller.cekDeliveryFee);
router.get('/v1/detail/:id', verifyToken, controller.getDetailOrder);
router.post('/v1/create', verifyToken, controller.createOrder);
router.put(
  '/v1/upload-payment-image/:id',
  verifyToken,
  controller.uploadPaymentImage,
);

export const orderRoutes = router;
