import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductData } from ".";

export enum Methodology {
    AGILE = "Agile",
    WATERFALL = "Waterfall",
}

export enum GitHub_Location {
    DEMO_URL = "https://github.com/bcgov/citz-imb-wayfinder",
}

@Entity({ name: "products" })
export class Product {
    public static readonly NAME_LENGTH = 50;
    public static readonly MAX_DEVELOPERS = 5;
    public static readonly LOCATION_LENGTH = 100;

    @PrimaryGeneratedColumn()
    public productId: number;

    @Column({ name: "product_name", length: Product.NAME_LENGTH })
    public productName: string;

    @Column({ name: "product_owner_name", length: Product.NAME_LENGTH })
    public productOwnerName: string;

    @Column({
        name: "developers",
        type: "simple-array",
        length: Product.MAX_DEVELOPERS,
    })
    public developers: string[];

    @Column({ name: "scrum_master_name", length: Product.NAME_LENGTH })
    public scrumMasterName: string;

    @Column({ name: "start_date", type: "date" })
    public startDate: string;

    @Column({ name: "methodology", length: Product.NAME_LENGTH })
    public methodology: Methodology;

    @Column({ name: "location", length: Product.LOCATION_LENGTH })
    public location: GitHub_Location;

    public buildData(): ProductData {
        return {
            productId: this.productId,
            productName: this.productName,
            productOwnerName: this.productOwnerName,
            developers: this.developers,
            scrumMasterName: this.scrumMasterName,
            startDate: this.startDate,
            methodology: this.methodology,
            location: this.location,
        };
    }
}
