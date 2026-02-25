import { Injectable, Inject } from '@nestjs/common';
import type { ProductRepository } from '../../domain/ports/product.repository';
import { PRODUCT_REPOSITORY } from '../../domain/ports/product.repository';
import { Product } from '../../domain/models/product.model';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(name: string, price: number): Promise<Product> {
    const product = new Product(randomUUID(), name, price, new Date());
    return this.productRepository.save(product);
  }
}
