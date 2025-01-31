import prisma from "../config/prisma.js";

export const fetchAllProducts = async (req, res) => {
  console.log('Fetching all Products...');

  try {
    const products = await prisma.product.findMany();
    console.log(JSON.stringify(products));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

