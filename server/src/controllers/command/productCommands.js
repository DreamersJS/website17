// commands
import { queryCategory, queryProductByName } from "../query/productQueries.js";

export const createProduct = (prisma) => async (productData) => {
    console.log('productCommands!!!');
    const { name, description, photo, price, quantity, inStock, categoryName, tagNames = [] } = productData;
    try {
        // 0. Find product by name if exists
        const existingProduct = await queryProductByName(prisma)(name);
        if (existingProduct) {
            return { message: "Product already exists!" }
        }

        // 1. Find or create category
        let category = await queryCategory(prisma)(categoryName);
        if (!category) {
            console.log(`Category '${categoryName}' not found in DB. Creating it...`);
            category = await createCategory(prisma)(categoryName);
        }

        // 2. Create product
        console.log('Creating product with categoryId:', category.id);
        const product = await prisma.product.create({
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

        // 3. Handle tags
        for (const tagName of tagNames) {
            const tag = await prisma.tag.upsert({
                where: { name: tagName },
                update: {},
                create: { name: tagName },
            });

            await prisma.productTag.create({
                data: {
                    productId: product.id,
                    tagId: tag.id,
                },
            });
        }

        return product;
    } catch (error) {
        console.error('Error creating product with tags:', error.message);
    }
};

export const createCategory = (prisma) => async (categoryName) => {
    category = await prisma.category.create({
        data: { name: categoryName },
    });
    return category;
}

export const updateProduct = (prisma) => async (id, productData) => {
    const { name, description, photo, price, quantity, inStock, categoryName, tagNames = [] } = productData;

    try {
        // 1. Find or create category
        let category = await queryCategory(prisma)(categoryName);
        if (!category) {
            console.log(`Category '${categoryName}' not found in DB. Creating it...`);
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

        return { results: updatedProduct };
    } catch (error) {
        console.error('Error updating product:', error.message);
        return { error: error.message };
    }
};

export const deleteProduct = (prisma) => async (id) => {
    try {
        // 1. Delete tags relation first (if using cascade, this might not be necessary)
        await prisma.productTag.deleteMany({
            where: { productId: Number(id) },
        });

        // 2. Delete the product
        const deletedProduct = await prisma.product.delete({
            where: { id: Number(id) },
        });

        return { results: deletedProduct };
    } catch (error) {
        console.error('Error deleting product:', error.message);
        return { error: error.message };
    }
};

/**
import { queryCategory, queryProductByName } from "../query/productQueries.js"

export const createProduct = (prisma) => async (data) => {

  const { name, categoryName } = data

  const existing = await queryProductByName(prisma)(name)

  if (existing) {
    throw new Error("Product already exists")
  }

  let category = await queryCategory(prisma)(categoryName)

  if (!category) {
    category = await prisma.category.create({
      data: { name: categoryName }
    })
  }

  const product = await prisma.product.create({
    data: {
      ...data,
      categoryId: category.id
    }
  })

  return product
}
 */