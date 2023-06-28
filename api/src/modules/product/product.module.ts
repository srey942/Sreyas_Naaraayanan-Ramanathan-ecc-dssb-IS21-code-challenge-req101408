import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '../common';
import { ProductController } from './controller';
import { Product } from './model';
import { ProductService } from './service';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            Product
        ])
    ],
    providers: [
        ProductService
    ],
    controllers: [
        ProductController
    ],
    exports: []
})
export class ProductModule { }
