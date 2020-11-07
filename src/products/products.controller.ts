import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsFilterDto } from './dto/products-filter.dto';
import { ProductsFilterValidationPipe } from './pipes/products-filter-validation.pipe';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get('/search')
  searchProducts(
    @Query(ProductsFilterValidationPipe) pattern: ProductsFilterDto,
  ) {
    return {};
  }
}
