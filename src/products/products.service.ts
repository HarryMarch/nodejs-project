import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getProductById(id: number) {
    const product = await this.productRepository.findOne(id);
  }

  /**
   * Retrieve all products object from database
   *
   * @return {*}  {any[]} array of product objects
   * @memberof ProductsService
   */
  getAllProducts() {
    // return this.products;
  }
}
