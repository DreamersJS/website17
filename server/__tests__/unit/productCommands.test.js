import { describe, it, expect, jest } from '@jest/globals';
import { createProduct } from '../../src/controllers/command/productCommands.js';
import { prismaMock } from '../../__mocks__/prisma.js';

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

        await expect(
            createProduct(prismaMock)({ name: 'Test' })
        ).rejects.toThrow('Product already exists');
    })
});