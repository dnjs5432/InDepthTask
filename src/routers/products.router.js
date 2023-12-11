import express from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { needSignin } from '../middlewares/need-signin.middleware.js';

const router = express.Router();
const productController = new ProductsController();

router.post('/', needSignin, productController.createProduct);
router.get('/', productController.getProduct);
router.get('/:productId', productController.getProductDetails);
// router.put('/:productId', productController.editProduct);
// router.delete('/:productId', productController.deleteProduct);

export default router;
