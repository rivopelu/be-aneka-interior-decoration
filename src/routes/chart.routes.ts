import { Router } from 'express';
import { ChartController } from '../controllers/cart.controller';
import verifyToken from '../middlewares/verify-token';

const router = Router();
const controller = new ChartController();
router.post('/v1/add', verifyToken, controller.addToChart);
router.delete('/v1/remove/:cartId', verifyToken, controller.removeItem);

export const chartRoutes = router;
