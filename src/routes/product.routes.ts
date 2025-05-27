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
router.put('/v1/category/edit', verifyAdmin, ProductController.editCategory);
router.delete(
  '/v1/category/delete/:id',
  verifyAdmin,
  ProductController.deleteCategory,
);

router.post('/v1/product/new', verifyAdmin, ProductController.createNewProduct);
router.post('/v1/product/edit/:id', verifyAdmin, ProductController.editProduct);
router.get('/v1/product/detail/:id', ProductController.detailProduct);
router.get(
  '/v1/product/admin/detail/:id',
  verifyAdmin,
  ProductController.adminDetailProduct,
);
router.get('/v1/product/list', ProductController.listProduct);
router.get('/v1/product/admin/list', ProductController.AdminListProduct);
router.delete(
  '/v1/product/delete/:id',
  verifyAdmin,
  ProductController.archiveProduct,
);
export const productRoutes = router;
