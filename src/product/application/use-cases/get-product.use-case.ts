import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ProductRepository } from '../../domain/ports/product.repository';
import { PRODUCT_REPOSITORY } from '../../domain/ports/product.repository';
import { Product } from '../../domain/models/product.model';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @InjectPinoLogger(GetProductUseCase.name)
    private readonly logger: PinoLogger,
  ) {}

  async getById(id: string): Promise<Product> {
    this.logger.info({ id }, 'Looking up product by id');
    const product = await this.productRepository.findById(id);
    if (!product) {
      this.logger.warn({ id }, 'Product not found');
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.logger.info({ id }, 'Product found successfully');
    return product;
  }

  async getAll(): Promise<Product[]> {
    this.logger.info('Fetching all products from repository');
    const products = await this.productRepository.findAll();
    this.logger.info(
      { count: products.length },
      'Retrieved products successfully',
    );
    return products;
  }
}
