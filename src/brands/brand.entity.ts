import { Product } from '../products/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDBEntity } from '../common/base.entity';

@Entity()
export class Brand extends BaseDBEntity<Brand> {
  @ApiProperty({ example: 1, description: 'The id of the Brand' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'New Brand', description: 'The name of the Brand' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Street 10, KF1, Islamabad',
    description: 'The address of the Brand',
  })
  @Column()
  address: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
