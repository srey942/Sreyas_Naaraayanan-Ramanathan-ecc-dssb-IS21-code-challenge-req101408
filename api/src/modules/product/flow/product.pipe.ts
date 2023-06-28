import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { Product, ProductInput } from '../model';
import { Methodology, GitHub_Location } from '../model/product.entity';

export class ProductPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<ProductInput>({
            productName: Joi.string().required().max(Product.NAME_LENGTH),
            productOwnerName: Joi.string().required().max(Product.NAME_LENGTH),
            developers: Joi.array().items(Joi.string().required().max(Product.NAME_LENGTH)).required().min(0).max(5),
            scrumMasterName: Joi.string().required().max(Product.NAME_LENGTH),
            startDate: Joi.date().required(),
            methodology: Joi.string().valid(...Object.values(Methodology)),
            location: Joi.string().valid(...Object.values(GitHub_Location))
            
        });

    }
}
