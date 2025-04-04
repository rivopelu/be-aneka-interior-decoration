import { Router } from 'express';
import { ChartController } from '../controllers/cart.controller';
import verifyToken from '../middlewares/verify-token';

const router = Router();
const controller = new ChartController();
router.post('/v1/add', verifyToken, controller.addToChart);
router.get('/v1/list', verifyToken, controller.getList);
router.get('/v1/count', verifyToken, controller.getCountItem);
router.delete('/v1/remove/:cartId', verifyToken, controller.removeItem);

export const cartRoutes = router;
