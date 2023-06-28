import { ApiProperty } from '@nestjs/swagger';

export class ProductData {

    /** SCHEMA
     *{
        productId: VALUE,
        productName: VALUE,
        productOwnerName: VALUE,
        Developers: [
         "NAME_1",
         "NAME_2",
         "NAME_3",
         "NAME_4",
         "NAME_5"
        ],
        scrumMasterName: VALUE,
        startDate: "YYYY/MM/DD",
        methodology: VALUE,
        location: VALUE
    }
     */

    @ApiProperty({ description: 'Product unique ID', example: '36635263' })
    public readonly productId: number;

    @ApiProperty({ description: 'Product name', example: 'Random' })
    public readonly productName: string;

    @ApiProperty({ description: 'Product Owner name', example: 'Name' })
    public readonly productOwnerName: string;

    @ApiProperty({ description: 'Developers', isArray: true, maximum: 5, example: '["NAME_1", "NAME_2", "NAME_3", "NAME_4", "NAME_5"]' })
    public readonly developers: string[];

    @ApiProperty({ description: 'Scrum Master name', example: 'Name' })
    public readonly scrumMasterName: string;

    @ApiProperty({ description: 'Start date', example: 'YYYY/MM/DD' })
    public readonly startDate: string;

    @ApiProperty({ description: 'Methodology', example: 'Scrum' })
    public readonly methodology: string;

    @ApiProperty({ description: 'Location', example: 'https://github.com/bcgov/citz-imb-wayfinder' })
    public readonly location: string;

}
