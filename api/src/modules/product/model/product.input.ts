import { ApiProperty } from '@nestjs/swagger';
import { Product, Methodology, GitHub_Location } from './product.entity';


export class ProductInput {

    @ApiProperty()
    public readonly productName: string;

    @ApiProperty()
    public readonly productOwnerName: string;

    @ApiProperty({isArray: true, maximum: Product.MAX_DEVELOPERS})
    public readonly developers: string[];

    @ApiProperty()
    public readonly scrumMasterName: string;

    @ApiProperty()
    public readonly startDate: string;

    @ApiProperty()
    public readonly methodology: Methodology;

    @ApiProperty()
    public readonly location: GitHub_Location;

}
