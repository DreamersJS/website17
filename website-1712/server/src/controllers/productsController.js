import db from "../config/db.js";
import prisma from "../config/prisma.js";

export const createProduct = async (req, res) => {
  console.log('createProduct!!!');
  const {
    name,
    description,
    photo,
    price,
    quantity,
    inStock,
    categoryName,
    tagNames = []
  } = req.body;
  console.log("categoryName being passed:", categoryName);

  try {
    // 1. Find or create category
    let category = await prisma.category.findUnique({ where: { name: categoryName } });

    if (!category) {
      console.log(`Category '${categoryName}' not found in DB. Creating it...`);
      category = await prisma.category.create({
        data: { name: categoryName },
      });
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

    return res.status(201).json({ results: product });

  } catch (error) {
    console.error("❌ Error creating product with tags:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return res.status(200).json({ results: products });

  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    photo,
    price,
    quantity,
    inStock,
    categoryName,
    tagNames = []
  } = req.body;

  try {
    // 1. Find or create category
    let category = await prisma.category.findUnique({ where: { name: categoryName } });

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName },
      });
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

    return res.status(200).json({ results: updatedProduct });

  } catch (error) {
    console.error("❌ Error updating product:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Delete tags relation first (if using cascade, this might not be necessary)
    await prisma.productTag.deleteMany({
      where: { productId: Number(id) },
    });

    // 2. Delete the product
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ results: deletedProduct });

  } catch (error) {
    console.error("❌ Error deleting product:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

