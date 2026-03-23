import { describe, it, expect, jest } from '@jest/globals';
import { createProduct } from '../src/controllers/command/productCommands.js';
import { prismaMock } from '../__mocks__/prisma.js';
import * as productQueries from '../src/controllers/query/productQueries.js';

describe.only('createProduct', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create product with category and tags', async () => {
        //arrange
        prismaMock.product.findUnique = jest.fn().mockResolvedValue(null);

        prismaMock.category.findUnique.mockResolvedValue(null);
        prismaMock.category.create.mockResolvedValue({ id: 1 });

        prismaMock.product.create.mockResolvedValue({ id: 10, name: 'Test' });

        prismaMock.tag.upsert.mockResolvedValue({ id: 5 });
        prismaMock.productTag.create.mockResolvedValue({});

        const input = {
            name: 'Test',
            description: 'desc',
            price: 100,
            quantity: 5,
            inStock: true,
            categoryName: 'Electronics',
            tagNames: ['new', 'hot'],
        };

        //act
        const result = await createProduct(prismaMock)(input);

        //assert
        expect(result).toEqual({ id: 10, name: 'Test' });
        expect(prismaMock.product.create).toHaveBeenCalled();
        expect(prismaMock.tag.upsert).toHaveBeenCalledTimes(2);
    });

    it('should throw if product exists', async () => {
        //arrange
        prismaMock.product.findUnique = jest.fn().mockResolvedValue({ id: 1 });
        // mock the query layer instead of prisma
        // jest
        //     .spyOn(productQueries, 'queryProductByName')
        //     .mockReturnValue(() => Promise.resolve({ id: 1 }));

        // //act
        // const result = await createProduct(prismaMock)({ name: 'Test' });
        // //assert
        // expect(result).rejects.toThrow('Product already exists');

        // await & rejects/resolves must be together
        await expect(
            createProduct(prismaMock)({ name: 'Test' })
        ).rejects.toThrow('Product already exists');
    })
});