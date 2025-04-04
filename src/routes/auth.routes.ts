import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

router.post('/v1/sign-up', AuthController.signUp);
router.post('/v1/sign-in', AuthController.signIn);

export const AuthRoutes = router;
