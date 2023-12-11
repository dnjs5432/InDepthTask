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
}
