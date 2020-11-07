import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { BrandRepository } from './brand.repository';
import { CreateBrandDto } from './dto/create-brand.dto';

/**
 * The service that handles all logic between application and database for Brand Entity
 *
 * @export
 * @class BrandsService
 */
@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandRepository)
    private brandRepository: BrandRepository,
  ) {}

  async getAllBrands(): Promise<Brand[]> {
    const brands = await this.brandRepository.find();
    return brands.map((brand) => brand.toJSON());
  }

  /**
   * Create and store new Brand to DB
   *
   * @param {CreateBrandDto} brand The Brand DTO
   * @return {*}  {Promise<Brand>} The saved Brand
   * @memberof BrandsService
   */
  async createBrand(brand: CreateBrandDto): Promise<Brand> {
    const entity = new Brand(brand);
    const savedEntity = await this.brandRepository.save(entity);

    return savedEntity.toJSON();
  }

  /**
   * Get brand entity that matches with id
   *
   * @param {number} id the id of brand
   * @return {*}  {Promise<Brand>} brand entity
   * @memberof BrandsService
   */
  async getBrandById(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne(id);

    if (!brand) {
      throw new NotFoundException();
    }

    return brand;
  }

  /**
   * Delete a brand from DB
   *
   * @param {number} id the id of brand
   * @return {*}  {Promise<boolean>} return true if success
   * @memberof BrandsService
   */
  async deleteBrandById(id: number): Promise<boolean> {
    const result = await this.brandRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return true;
  }
}
