import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { GetProductUseCase } from '../../application/use-cases/get-product.use-case';
import { CreateProductDto } from './dtos/create-product.dto';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    @InjectPinoLogger(ProductController.name)
    private readonly logger: PinoLogger,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    this.logger.info({ name: createProductDto.name }, 'Creating new product');
    return this.createProductUseCase.execute(
      createProductDto.name,
      createProductDto.price,
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    this.logger.info({ id }, 'Fetching product by ID');
    return this.getProductUseCase.getById(id);
  }

  @Get()
  async getAll() {
    this.logger.info('Fetching all products');
    return this.getProductUseCase.getAll();
  }
}
