import { Brand } from '../brands/brand.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStatus } from './product-status.enum';
import { BaseDBEntity } from '../common/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product extends BaseDBEntity<Product> {
  @ApiProperty({ example: 1, description: 'The id of the Product' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Our Product',
    description: 'The name of the Product',
  })
  @Column()
  name: string;

  @ApiProperty({
    enum: ['AVAILABLE', 'NOT_ACTIVE', 'EXPIRED'],
    description: 'The status of the Product',
  })
  @Column()
  status: ProductStatus;

  @ApiProperty({ example: 1000, description: 'The price of the Product' })
  @Column()
  price: number;

  @ApiProperty({ example: 'red', description: 'The color of the Product' })
  @Column()
  color: string;

  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'CASCADE' })
  brand: Brand;
}
