import { Router } from 'express';
import { ChartController } from '../controllers/cart.controller';

const router = Router();

router.patch('/v1/add', ChartController.addToChart);

export const chartRoutes = router;
