import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

import { ApplicationModule } from "../../app.module";

/**
 * Product API end-to-end tests
 *
 * This test suite performs end-to-end tests on the Product API endpoints,
 * allowing us to test the behavior of the API and making sure that it fits
 * the requirements.
 */
describe("Product API", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ApplicationModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => app.close());

    it("Should return empty Product list", () =>
        request(app.getHttpServer())
            .get("/product")
            .expect(HttpStatus.OK)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array);
                expect(response.body.length).toEqual(0);
            }));

    it("Should insert new Product in the API", () => {
        return request(app.getHttpServer())
            .post("/product")
            .send({
                productName: "Product 1",
                productOwnerName: "Product Owner 1",
                developers: ["Developer 1", "Developer 2", "Developer 3"],
                scrumMasterName: "Scrum Master 1",
                startDate: "2022/12/1",
                methodology: "Agile",
            })
            .expect(HttpStatus.CREATED)
            .then((response) => {
                expect(response.body).toHaveProperty("productId");
                expect(response.body).toHaveProperty("productName");
                expect(response.body).toHaveProperty("productOwnerName");
                expect(response.body).toHaveProperty("developers");
                expect(response.body).toHaveProperty("scrumMasterName");
                expect(response.body).toHaveProperty("startDate");
                expect(response.body).toHaveProperty("methodology");
            });
    });

    it("should seed the database with 40 products", () => {
        return request(app.getHttpServer())
            .post("/product/seed")
            .expect(HttpStatus.CREATED)
            .then((response) => {
                expect(response.body).toHaveProperty("status");
                expect(response.body.status).toEqual("Done");
            });
    });

    it("Should return a list of Products", () => {
        return request(app.getHttpServer())
            .get("/product")
            .expect(HttpStatus.OK)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array);
                expect(response.body.length).toEqual(41);
            });
    });

    it("Should return a single Product", () => {
        return request(app.getHttpServer())
            .get("/product/1")
            .expect(HttpStatus.OK)
            .then((response) => {
                expect(response.body.productId).toEqual(1);
            });
    });

    it("Should update a single Product", () => {
        return request(app.getHttpServer())
            .put("/product/1")
            .send({
                productName: "Updated Product 1"
            })
            .expect(HttpStatus.OK)
            .then((response) => {
                expect(response.body).toHaveProperty("productName");
                expect(response.body.productName).toEqual("Updated Product 1");
                expect(response.body.productId).toEqual(1);
            });
    });

    it("Should delete a single Product", () => {
        return request(app.getHttpServer())
            .delete("/product/1")
            .expect(HttpStatus.OK)
            .then((response) => {
                expect(response.body).toHaveProperty("status");
                expect(response.body.status).toEqual("Done");
            });
    });
});
