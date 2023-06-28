import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Product, ProductInput } from "../model";
import { Methodology, GitHub_Location } from "../model/product.entity";

@Injectable()
export class ProductService {
    public constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    public async find(): Promise<Product[]> {
        return this.productRepository.find();
    }

    public async findById(id: number): Promise<Product | undefined> {
        return this.productRepository.findOne(id);
    }

    public async create(input: ProductInput): Promise<Product> {
        const product = new Product();

        product.productName = input.productName;
        product.productOwnerName = input.productOwnerName;
        product.developers = input.developers;
        product.scrumMasterName = input.scrumMasterName;
        product.startDate = input.startDate;
        product.methodology = input.methodology;
        product.location = input.location;

        return this.productRepository.save(product);
    }

    //update
    public async update(id: number, product: ProductInput): Promise<any> {
        await this.productRepository.update(id, product);
        return await this.productRepository.findOne(id);
    }

    public async seed(): Promise<void> {
        //generate 40 random products
        const products = [];
        for (let i = 0; i < 40; i++) {
            const product = new Product();
            product.productName = `Product ${i}`;
            product.productOwnerName = `Product Owner ${i}`;
            product.developers = [`Developer `];
            product.scrumMasterName = `Scrum Master ${i}`;
            product.startDate = new Date().toISOString().slice(0, 10);
            product.methodology = Methodology.AGILE;
            product.location = GitHub_Location.DEMO_URL;
            products.push(product);
        }
        await this.productRepository.save(products);
    }

    //delete
    public async delete(id: number): Promise<any> {
        return await this.productRepository.delete(id);
    }
}
