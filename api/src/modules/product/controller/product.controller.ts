import {
    Body,
    Param,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Inject,
    InternalServerErrorException,
    NotFoundException,
    Post,
    Put,
    BadRequestException,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { LoggerService } from "../../common";
import { Service } from "../../tokens";

import { ProductPipe } from "../flow";
import { ProductData, ProductInput } from "../model";
import { ProductService } from "../service";
import { Config } from "../../common/model/config";

@Controller("product")
@ApiTags("product")
export class ProductController {
    public constructor(
        @Inject(Service.CONFIG)
        private readonly config: Config,
        private readonly logger: LoggerService,
        private readonly productService: ProductService
    ) {}

    // get all products
    @Get()
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ProductData })
    public async find(): Promise<ProductData[]> {
        const products = await this.productService.find();
        return products.map((product) => product.buildData());
    }

    //get product by id
    @Get(":id")
    @ApiResponse({ status: HttpStatus.OK, type: ProductData })
    public async findById(@Param("id") id: number): Promise<ProductData> {
        const product = await this.productService.findById(id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product.buildData();
    }

    @Delete(":id")
    @ApiResponse({ status: HttpStatus.OK })
    public async delete(
        @Param("id") id: number
    ): Promise<{ status: "Done" | "Failed" }> {
        this.logger.info(this.config.API_PORT.toString());
        try {
            await this.productService.delete(id);
            return { status: "Done" };
        } catch (e) {
            return { status: "Failed" };
        }
    }

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: ProductData })
    public async create(
        @Body(ProductPipe) input: ProductInput
    ): Promise<ProductData> {
        const product = await this.productService.create(input);
        this.logger.info(`Product with ID ${product.productId} created`);
        return product.buildData();
    }

    @Put(":id")
    @ApiResponse({ status: HttpStatus.OK, type: ProductData })
    public async update(
        @Param("id") id: number,
        @Body() product: ProductInput
    ): Promise<ProductData> {
        const p = await this.productService.findById(id);
        if (!p) {
            throw new BadRequestException(`Product with ID ${id} not found`);
        }
        try {
            const udpatedProduct = await this.productService.update(
                id,
                product
            );
            return udpatedProduct.buildData();
        } catch (e) {
            throw new InternalServerErrorException(
                `Product with ID ${id} could not be updated`
            );
        }
    }

    @Post("seed")
    @ApiResponse({ status: HttpStatus.OK })
    public async seed(): Promise<{ status: "Done" | "Failed" }> {
        try {
            await this.productService.seed();
            return { status: "Done" };
        } catch (e) {
            return { status: "Failed" };
        }
    }
}
