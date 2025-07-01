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

export const updateProduct = async (req, res) => {};
export const deleteProduct = async (req, res) => {};
