import { Brand } from '../brands/brand.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductStatus } from './product-status.enum';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: ProductStatus;

  @Column()
  price: number;

  @Column()
  color: string;

  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'CASCADE' })
  brand: Brand;
}
