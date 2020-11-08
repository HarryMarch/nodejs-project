import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { BrandRepository } from '../brands/brand.repository';
import { BrandsService } from '../brands/brands.service';
import { CreateProductDto } from './dto/create-product.dto';
import { RetrieveProductDto } from './dto/retrieve-product.dto';
import { ProductStatus } from './product-status.enum';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        ProductRepository,
        BrandsService,
        BrandRepository,
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Get all products', () => {
    it('should return an array of products entity', async () => {
      // prepare entity
      const products = [new Product()];
      const dtoArray = products.map((p) => plainToClass(RetrieveProductDto, p));

      jest.spyOn(service, 'getAllProducts').mockResolvedValue(products);
      await expect(controller.getAllProducts()).resolves.toEqual(dtoArray);
      expect(service.getAllProducts).toHaveBeenCalled();
    });
  });

  describe('Get product', () => {
    const id = 1000;

    it('should return an object of product entity', async () => {
      // prepare entity
      const product = new Product();
      product.id = id;
      const dto = plainToClass(RetrieveProductDto, product);

      jest.spyOn(service, 'getProductById').mockResolvedValue(product);
      await expect(controller.getProductById(id)).resolves.toEqual(dto);
      expect(service.getProductById).toHaveBeenCalledWith(id);
    });
  });

  describe('Delete product', () => {
    const id = 1000;

    it('should delete product successfully', async () => {
      jest.spyOn(service, 'deleteProductById').mockResolvedValue(true);
      await expect(controller.deleteProduct(id)).resolves.toBe(true);
      expect(service.deleteProductById).toHaveBeenCalledWith(id);
    });
  });

  describe('Create product', () => {
    it('should return an object of product entity as saved entity', async () => {
      // prepare entity
      const name = 'name';
      const color = 'red';
      const status = ProductStatus.AVAILABLE;
      const price = 1000;
      const brandId = 1;
      const createProductDto = new CreateProductDto();
      createProductDto.name = name;
      createProductDto.color = color;
      createProductDto.status = status;
      createProductDto.price = price;
      createProductDto.brandId = brandId;
      const product = new Product();
      product.name = name;
      product.color = color;
      product.status = status;
      product.price = price;
      const retrieveProductDto = plainToClass(RetrieveProductDto, product);

      jest.spyOn(service, 'createProduct').mockResolvedValue(product);
      const newEntity = await controller.createProduct(createProductDto);
      expect(newEntity).toMatchObject(retrieveProductDto);
      expect(service.createProduct).toHaveBeenCalledWith(createProductDto);
    });
  });
});
