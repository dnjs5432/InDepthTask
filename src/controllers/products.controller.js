import { ProductsService } from '../services/products.services.js';

export class ProductsController {
  productsService = new ProductsService();

  // 생성
  createProduct = async (req, res, next) => {
    try {
      const { userId, name: userName } = res.locals.user;
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: '빈칸을 모두 채워주세요.',
        });
      }

      const createdProduct = await this.productsService.createProduct(
        title,
        description,
        userId,
      );

      if (createdProduct) {
        return res.status(201).json({
          success: true,
          message: '상품 생성에 성공했습니다.',
          data: { createdProduct, userName },
        });
      } else if (!createdProduct.success) {
        return res.status(400).json(createdProduct);
      }
    } catch (err) {
      next(err);
    }
  };

  //조회
  getProduct = async (req, res, next) => {
    try {
      const { sort } = req.query;
      let upperCaseSort = sort?.toLowerCase();

      if (upperCaseSort !== 'asc' && upperCaseSort !== 'desc') {
        upperCaseSort = 'desc';
      }

      const products = await this.productsService.getProduct(upperCaseSort);

      if (products) {
        return res.status(200).json({
          success: true,
          message: '상품 목록 조회에 성공했습니다.',
          data: products,
        });
      }
    } catch (err) {
      next(err);
    }
  };

  // 상세조회
  getProductDetails = async (req, res, next) => {
    try {
      const { productId } = req.params;

      const product = await this.productsService.getProductDetails(productId);

      if (!product.success) {
        return res.status(404).json(product);
      }
      return res.status(200).json({
        message: '상품 조회에 성공했습니다.',
        data: product.data,
      });
    } catch (err) {
      next(err);
    }
  };
}
