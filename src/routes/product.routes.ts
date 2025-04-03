import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import verifyToken, { verifyAdmin } from '../middlewares/verify-token';
import { ProductController } from '../controllers/product.controller';

const router = Router();

router.post(
  '/v1/category/new',
  verifyAdmin,
  ProductController.createNewCategory,
);

router.get('/v1/category/list', ProductController.listCategory);
export const productRoutes = router;
