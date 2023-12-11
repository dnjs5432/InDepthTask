import { ProductsRepositories } from '../repositories/products.repositories.js';

export class ProductsService {
  productsRepositories = new ProductsRepositories();

  createProduct = async (title, description, userId) => {
    const product = await this.productsRepositories.createProduct(
      title,
      description,
      userId,
    );
    return product;
  };

  getProduct = async (upperCaseSort) => {
    const getproduct = await this.productsRepositories.getProduct(
      upperCaseSort,
    );
    return getproduct;
  };

  getProductDetails = async (productId) => {
    const detailsProduct = await this.productsRepositories.getProductDetails(
      productId,
    );

    if (!detailsProduct) {
      return {
        success: false,
        message: '상품 조회에 실패했습니다.',
      };
    }
    return {
      success: true,
      data: detailsProduct,
    };
  };

  editProduct = async (
    productId,
    title,
    description,
    status,
    userId,
    userName,
  ) => {
    const product = await this.productsRepositories.editProduct(
      productId,
      title,
      description,
      status,
      userId,
      userName,
    );

    if (!title && !description && !status) {
      return {
        success: false,
        message: '수정 정보는 최소 한 가지 이상이어야 합니다.',
      };
    }

    const isValidStatus = status
      ? status === 'FOR_SALE' || status === 'SOLD_OUT'
      : true;

    if (!isValidStatus) {
      return {
        success: false,
        message: '지원하지 않는 상태입니다. (status: FOR_SALE | SOLD_OUT)',
      };
    }

    if (!product.productId) {
      return {
        success: false,
        message: '상품 조회에 실패했습니다.',
      };
    }
    if (product.UserId !== userId) {
      return {
        success: false,
        message: '상품 수정 권한이 없습니다.',
      };
    }

    return {
      success: true,
      message: '상품 수정이 완료 되었습니다.',
      data: product,
    };
  };

  deleteProduct = async (productId, userId) => {
    const existProduct = await this.productsRepositories.getProductDetails(
      productId,
    );

    if (!existProduct) {
      return {
        success: false,
        message: '상품이 존재하지 않습니다.',
      };
    }

    const deletedProduct = await this.productsRepositories.deleteProduct(
      productId,
      userId,
    );

    const isProductOwner = deletedProduct.UserId === userId;

    if (!isProductOwner) {
      return res.status(403).json({
        success: false,
        message: '상품 삭제 권한이 없습니다.',
      });
    }

    return {
      success: true,
      message: '상품 삭제가 완료 되었습니다.',
      data: deletedProduct,
    };
  };
}
