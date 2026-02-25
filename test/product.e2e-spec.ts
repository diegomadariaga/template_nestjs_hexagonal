import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateProductDto } from 'src/product/infrastructure/controllers/dtos/create-product.dto';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /products', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
      };

      const response = await request(app.getHttpServer())
        .post('/products')
        .send(createProductDto)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.name).toEqual(createProductDto.name);
      expect(response.body.price).toEqual(createProductDto.price);
    });
  });

  describe('GET /products/:id', () => {
    it('should get a product by id', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
      };

      const response = await request(app.getHttpServer())
        .post('/products')
        .send(createProductDto)
        .expect(201);

      const productId = response.body.id;

      const responseGet = await request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(200);

      expect(responseGet.body).toBeDefined();
      expect(responseGet.body.id).toEqual(productId);
      expect(responseGet.body.name).toEqual(createProductDto.name);
      expect(responseGet.body.price).toEqual(createProductDto.price);
    });
  });
});
