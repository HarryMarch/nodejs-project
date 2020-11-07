import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
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
import { Brand } from './brand.entity';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get brand' })
  @ApiOkResponse({
    description: 'The found record',
    type: Brand,
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
  @UseInterceptors(ClassSerializerInterceptor)
  getBrandById(@Param('id', ParseIntPipe) id: number): Promise<Brand> {
    return this.brandService.getBrandById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create brand' })
  @ApiCreatedResponse({
    description: 'Record created',
    type: Brand,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  createBrand(@Body() brand: CreateBrandDto): Promise<Brand> {
    return this.brandService.createBrand(brand);
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiOkResponse({
    description: 'Successful Request',
    type: [Brand],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getAllBrands(): Promise<Brand[]> {
    return this.brandService.getAllBrands();
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete brand' })
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
  deleteBrand(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.brandService.deleteBrandById(id);
  }
}
