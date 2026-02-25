import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ProductRepository } from '../../domain/ports/product.repository';
import { PRODUCT_REPOSITORY } from '../../domain/ports/product.repository';
import { Product } from '../../domain/models/product.model';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
