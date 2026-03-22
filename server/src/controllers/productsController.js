import prisma from '../config/prisma.js';
import { createProduct, deleteProduct, updateProduct } from './command/productCommands.js'
import { getAllProducts, getProductById } from './query/productQueries.js';

/**
 * @desc    Create a new product (with tags and category)
 * @route   POST /api/product
 * @access  Admin
 * @docs    See: docs/api-doc.md#post-apiproduct
 */
export const handleCreateProduct = async (req, res) => {
  console.log('handleCreateProduct ProductsController!!!');
  const { name, description, photo, price, quantity, inStock, categoryName, tagNames = [] } = req.body;
  try {
    const product = await createProduct(prisma)(req.body)
    return res.status(201).json({ data: product, message:"Product created successfully" });
  } catch (error) {
    console.error('Error creating product with tags:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * @desc    Fetch all products including category and tags
 * @route   GET /api/product/all
 * @access  Public
 * @docs    See: docs/api-doc.md#get-apiproductall
 */
export const handleGetAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts(prisma)()
    return res.status(200).json({ data: products });// res.status(200).json({message: 'Fetch all products successful', data: products});
  } catch (error) {
    // next(error); if I wanna pass the err to the error handler
    console.error('Error fetching products:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * @desc    Fetch a product by ID
 * @route   GET /api/product/:id
 * @access  Public
 * @docs    See: docs/api-doc.md#get-apiproductid
 */
export const handleGetProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(prisma)(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json({ data: product });
  } catch (error) {
    console.error('Error fetching product:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * @desc    Update a product and its tags by ID
 * @route   PUT /api/product/:id
 * @access  Admin
 * @docs    See: docs/api-doc.md#put-apiproductid
 */
export const handleUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, photo, price, quantity, inStock, categoryName, tagNames = [] } = req.body;

  try {
    const updatedProduct = await updateProduct(prisma)(id, req.body)
    return res.status(200).json({ data: updatedProduct, message:"Product updated" });
  } catch (error) {
    console.error('Error updating product:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * @desc    Delete a product and its tag links
 * @route   DELETE /api/product/:id
 * @access  Admin
 * @docs    See: docs/api-doc.md#delete-apiproductid
 */
export const handleDeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProduct(prisma)(id);

    return res.status(200).json({ data: deletedProduct, message:"Product deleted" });// message
  } catch (error) {
    console.error('Error deleting product:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
