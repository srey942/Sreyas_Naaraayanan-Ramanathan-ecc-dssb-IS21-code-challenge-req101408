import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from './common';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        CommonModule,
        // MOcking the TypeOrmModule.forRoot() call
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: ':memory:',

            //explain why this is needed
            entities: [
                __dirname + '/**/*.entity{.ts,.js}'
            ],
            synchronize: true,
            logging: false
        }),
        ProductModule
    ],
})
export class ApplicationModule {}
