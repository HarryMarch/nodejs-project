import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Brand } from '../../brands/brand.entity';
import { ProductStatus } from '../product-status.enum';

@Exclude()
export class RetrieveProductDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'The id of the Product' })
  id: number;

  @Expose()
  @ApiProperty({
    example: 'New Product',
    description: 'The name of the Product',
  })
  name: string;

  @Expose()
  @ApiProperty({
    enum: ['AVAILABLE', 'NOT_ACTIVE', 'EXPIRED'],
    description: 'The status of the Product',
  })
  status: ProductStatus;

  @Expose()
  @ApiProperty({ example: 1000, description: 'The price of the Product' })
  price: number;

  @Expose()
  @ApiProperty({ example: 'red', description: 'The color of the Product' })
  color: string;

  @ApiProperty({
    example: 1,
    description: 'The brand of the Product',
  })
  brandId: number;

  @Expose()
  @Type(() => Brand)
  @Transform((brand) => brand?.name || 'no brand', { toClassOnly: true })
  brand: string;
}
