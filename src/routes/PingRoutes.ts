import { Router } from 'express';
import { PingController } from '../controllers/PingController';

const router = Router();

router.get('/ping', PingController.ping);
router.get('/404', PingController.notFound);

export const PingRoutes = router;
