import { queryCategory, queryProductByName } from "../query/productQueries.js";

export const createProduct = (prisma) => async (productData) => {
    return prisma.$transaction(async (tx) => {

        const existingProduct = await queryProductByName(tx)(productData.name);
        if (existingProduct) {
            throw new Error('Product already exists');
        }

        let category = await queryCategory(tx)(productData.categoryName);
        if (!category) {
            category = await tx.category.create({
                data: { name: productData.categoryName },
            });
        }

        const product = await tx.product.create({
            data: {
                ...productData,
                categoryId: category.id,
            },
        });

        await Promise.all(
            productData.tagNames.map(async (tagName) => {
                const tag = await tx.tag.upsert({
                    where: { name: tagName },
                    update: {},
                    create: { name: tagName },
                });

                await tx.productTag.create({
                    data: {
                        productId: product.id,
                        tagId: tag.id,
                    },
                });
            })
        );

        return product;
    });
};

export const createCategory = (prisma) => async (categoryName) => {
    const category = await prisma.category.create({
        data: { name: categoryName },
    });
    return category;
}

export const updateProduct = (prisma) => async (id, productData) => {
    const { name, description, photo, price, quantity, inStock, categoryName, tagNames = [] } = productData;

    // 1. Find or create category
    let category = await queryCategory(prisma)(categoryName);
    if (!category) {
        category = await createCategory(prisma)(categoryName);
    }

    // 2. Update the product
    const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            name,
            description,
            photo,
            price,
            quantity,
            inStock,
            categoryId: category.id,
        },
    });

    // 3. Remove existing tags
    await prisma.productTag.deleteMany({
        where: { productId: updatedProduct.id },
    });

    // 4. Recreate tags
    for (const tagName of tagNames) {
        const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
        });

        await prisma.productTag.create({
            data: {
                productId: updatedProduct.id,
                tagId: tag.id,
            },
        });
    }
    return updatedProduct;
};

export const deleteProduct = (prisma) => async (id) => {
    // 1. Delete tags relation first (if using cascade, this might not be necessary)
    await prisma.productTag.deleteMany({
        where: { productId: Number(id) },
    });

    // 2. Delete the product
    const deletedProduct = await prisma.product.delete({
        where: { id: Number(id) },
    });
    return deletedProduct;
};
