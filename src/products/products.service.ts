import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsFilterDto } from './dto/products-filter.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  /**
   * Retrieve all Products from DB
   *
   * @param {boolean} [withBrand=true]
   * @return {*}  {Promise<Product[]>} an array of Products
   * @memberof ProductsService
   */
  async getAllProducts(withBrand = true): Promise<Product[]> {
    const products = await this.productRepository.find(
      withBrand && { relations: ['brand'] },
    );
    return products;
  }

  /**
   * Get product entity that matches with id
   *
   * @param {number} id the id of product
   * @param {boolean} [withBrand=true]
   * @return {*}  {Promise<Product>} product entity
   * @memberof ProductsService
   */
  async getProductById(id: number, withBrand = true): Promise<Product> {
    const product = await this.productRepository.findOne(
      id,
      withBrand && { relations: ['brand'] },
    );

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  /**
   * Delete a product from DB
   *
   * @param {number} id the id of product
   * @return {*}  {Promise<boolean>} return true if success
   * @memberof ProductsService
   */
  async deleteProductById(id: number): Promise<boolean> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return true;
  }

  /**
   * Create and store new Product to DB
   *
   * @param {CreateProductDto} product The Product DTO
   * @return {*}  {Promise<Product>} The saved Product
   * @memberof ProductsService
   */
  async createProduct(product: CreateProductDto): Promise<Product> {
    const entity = new Product(product);
    const savedEntity = await this.productRepository.save(entity);

    return savedEntity.toJSON();
  }

  /**
   * Search Products with proper column has value like search string
   *
   * @param {ProductsFilterDto} pattern
   * @return {*}  {Promise<Product[]>} an array of Products
   * @memberof ProductsService
   */
  async getAllProductsByPropertyValue(
    pattern: ProductsFilterDto,
  ): Promise<Product[]> {
    const { criterion, value } = pattern;
    const condition = {};
    condition[criterion] = Like(`%${value}%`);

    const products = await this.productRepository.find({
      relations: ['brand'],
      where: condition,
    });

    return products;
  }
}
