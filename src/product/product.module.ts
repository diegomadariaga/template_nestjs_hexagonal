import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './infrastructure/entities/product.entity';
import { ProductController } from './infrastructure/controllers/product.controller';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetProductUseCase } from './application/use-cases/get-product.use-case';
import { TypeOrmProductRepository } from './infrastructure/repositories/product.repository';
import { PRODUCT_REPOSITORY } from './domain/ports/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    GetProductUseCase,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: TypeOrmProductRepository,
    },
  ],
})
export class ProductModule {}
