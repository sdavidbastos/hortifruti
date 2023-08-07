const request = require('supertest')
const app = require("../../src/config/app")
const { ProductBuilder } = require('../builders');
const { HelperFactory } = require('../../src/utils/helpers');
const client = require('../../src/database/prisma-client');

describe('Product Route Test Suite', () => {
    const { token } = HelperFactory.execute()
    test('should return new product', async () => {
        const { market: { user, ...market }, id, ...product } = new ProductBuilder().build()
        const createProductPromise = client.product.create({
            data: {
                ...product,
                market: {
                    create: {
                        ...market,
                        user: {
                            create: {
                                ...user
                            }
                        }
                    }
                }
            }
        })
        const createTokenPromise = token.create(user.id)
        const [productCreated, authorization] = await Promise.all([createProductPromise, createTokenPromise])
        console.log("[productCreated] => ", productCreated)
        const response = await request(app)
            .post('/api/product')
            .set('Authorization', authorization)
            .send({ data: product });

        expect(response.body).toEqual(expect.objectContaining({ name: product.name, price: product.price }))
        expect(response.statusCode).toBe(200)

    })

});
