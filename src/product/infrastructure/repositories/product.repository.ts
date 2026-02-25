import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductRepository } from '../../domain/ports/product.repository';
import { Product } from '../../domain/models/product.model';

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  private mapToDomain(entity: ProductEntity): Product {
    return new Product(entity.id, entity.name, entity.price, entity.createdAt);
  }

  private mapToEntity(domain: Product): ProductEntity {
    const entity = new ProductEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.price = domain.price;
    entity.createdAt = domain.createdAt;
    return entity;
  }

  async save(product: Product): Promise<Product> {
    const entity = this.mapToEntity(product);
    const savedEntity = await this.repository.save(entity);
    return this.mapToDomain(savedEntity);
  }

  async findById(id: string): Promise<Product | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return this.mapToDomain(entity);
  }

  async findAll(): Promise<Product[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.mapToDomain(e));
  }
}
