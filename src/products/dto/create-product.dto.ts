import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsPositive,
  IsString,
  IsNumber,
} from 'class-validator';
import { Brand } from 'src/brands/brand.entity';
import { ProductStatus } from '../product-status.enum';

export class CreateProductDto {
  @ApiProperty({
    example: 'New Product',
    description: 'The name of the Product',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    enum: ['AVAILABLE', 'NOT_ACTIVE', 'EXPIRED'],
    description: 'The status of the Product',
  })
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty({ example: 1000, description: 'The price of the Product' })
  @IsPositive()
  price: number;

  @ApiProperty({ example: 'red', description: 'The color of the Product' })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({
    example: 1,
    description: 'The brand of the Product',
  })
  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  brand?: Brand;
}
