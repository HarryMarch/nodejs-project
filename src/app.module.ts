import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BrandsModule, ProductsModule],
})
// TODO:
/*
 *
 * 3, logging
 * 5, github action
 * 6, migration and seed
 * 7,
 */
export class AppModule {}
