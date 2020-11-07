import { ApiProperty } from '@nestjs/swagger';

export class ProductsFilterDto {
  @ApiProperty({
    enum: ['name', 'color', 'brand'],
    description: 'The criterion of the Filter',
  })
  criterion: ProductsFilterCriteria;

  @ApiProperty({
    example: 'The new product',
    description: 'The search value of the Filter',
  })
  value: string;
}

export enum ProductsFilterCriteria {
  NAME = 'name',
  COLOR = 'color',
  BRAND = 'brand',
}
