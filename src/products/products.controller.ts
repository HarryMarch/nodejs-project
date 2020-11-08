import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { BrandsService } from '../brands/brands.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ProductsFilterCriteria,
  ProductsFilterDto,
} from './dto/products-filter.dto';
import { RetrieveProductDto } from './dto/retrieve-product.dto';
import { BrandIdValidationPipe } from './pipes/brandId-validation.pipe';
import { ProductsFilterValidationPipe } from './pipes/products-filter-validation.pipe';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private brandsService: BrandsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({
    description: 'Successful Request',
    type: [RetrieveProductDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getAllProducts(): Promise<RetrieveProductDto[]> {
    const products = await this.productsService.getAllProducts();
    return products.map((product) => plainToClass(RetrieveProductDto, product));
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search products' })
  @ApiOkResponse({
    description: 'Successful Request',
    type: [RetrieveProductDto],
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async searchProducts(
    @Query(new ProductsFilterValidationPipe()) pattern: ProductsFilterDto,
  ): Promise<RetrieveProductDto[]> {
    const { criterion, value } = pattern;

    if (criterion === ProductsFilterCriteria.BRAND) {
      return await this.brandsService.getAllProductsByBrandName(value);
    }

    const products = await this.productsService.getAllProductsByPropertyValue(
      pattern,
    );

    return products.map((product) => plainToClass(RetrieveProductDto, product));
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get product' })
  @ApiOkResponse({
    description: 'The found record',
    type: RetrieveProductDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RetrieveProductDto> {
    const product = await this.productsService.getProductById(id);
    return plainToClass(RetrieveProductDto, product);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiOkResponse({
    description: 'Deleted successfully',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiNotFoundResponse({
    description: 'Not found record',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.productsService.deleteProductById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  @ApiCreatedResponse({
    description: 'Record created',
    type: RetrieveProductDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async createProduct(
    @Body(BrandIdValidationPipe) product: CreateProductDto,
  ): Promise<RetrieveProductDto> {
    const entity = await this.productsService.createProduct(product);
    return plainToClass(RetrieveProductDto, entity);
  }
}
