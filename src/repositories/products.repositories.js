import { prisma } from '../utils/prisma/index.js';

export class ProductsRepositories {
  createProduct = async (title, description, userId) => {
    const product = await prisma.products.create({
      data: {
        title,
        description,
        UserId: userId,
      },
    });
    return product;
  };

  getProduct = async (upperCaseSort) => {
    const getproduct = await prisma.products.findMany({
      select: {
        productId: true,
        title: true,
        description: true,
        status: true,
        UserId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: upperCaseSort,
      },
    });
    return getproduct;
  };

  getProductDetails = async (productId) => {
    const detailsProduct = await prisma.products.findFirst({
      where: { productId: +productId },
    });
    return detailsProduct;
  };
}
