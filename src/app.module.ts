import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/infrastructure/entities/product.entity';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';
import type { IncomingMessage, ServerResponse } from 'http';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req: IncomingMessage, res: ServerResponse) => {
          const id =
            req.headers['x-request-id'] ||
            req.headers['x-correlation-id'] ||
            randomUUID();
          res.setHeader('x-request-id', id);
          return id;
        },
        customProps: (req) => ({
          requestId: req.id,
        }),
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { colorize: true } }
            : undefined,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [ProductEntity],
      synchronize: true, // Auto-create tables for demo purposes
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
