import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

router.post('/v1/sign-up', AuthController.signUp);

export const AuthRoutes = router;
