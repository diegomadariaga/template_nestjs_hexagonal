import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { GetProductUseCase } from '../../application/use-cases/get-product.use-case';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(
      createProductDto.name,
      createProductDto.price,
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getProductUseCase.getById(id);
  }

  @Get()
  async getAll() {
    return this.getProductUseCase.getAll();
  }
}
