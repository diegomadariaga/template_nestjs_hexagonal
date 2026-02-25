import { Injectable, Inject } from '@nestjs/common';
import type { ProductRepository } from '../../domain/ports/product.repository';
import { PRODUCT_REPOSITORY } from '../../domain/ports/product.repository';
import { Product } from '../../domain/models/product.model';
import { randomUUID } from 'crypto';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @InjectPinoLogger(CreateProductUseCase.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute(name: string, price: number): Promise<Product> {
    this.logger.info({ name, price }, 'Executing create product use case');
    const product = new Product(randomUUID(), name, price, new Date());
    const savedProduct = await this.productRepository.save(product);
    this.logger.info(
      { productId: savedProduct.id },
      'Product created successfully',
    );
    return savedProduct;
  }
}
