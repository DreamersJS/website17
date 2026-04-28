import prisma from '../config/prisma.js';
import { createProduct, deleteProduct, updateProduct } from './command/productCommands.js'
import { getAllProducts, getProductById } from './query/productQueries.js';

/**
 * @desc    Create a new product (with tags and category)
 * @route   POST /api/product
 * @access  Admin
 * @docs    See: docs/api-doc.md#post-apiproduct
 */
export const handleCreateProduct = async (req, res, next) => {
  try {
    const product = await createProduct(prisma)(req.body)
    return res.status(201).json({ data: product, message:"Product created successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch all products including category and tags
 * @route   GET /api/product/all
 * @access  Public
 * @docs    See: docs/api-doc.md#get-apiproductall
 */
export const handleGetAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts(prisma)()
    return res.status(200).json({ data: products });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch a product by ID
 * @route   GET /api/product/:id
 * @access  Public
 * @docs    See: docs/api-doc.md#get-apiproductid
 */
export const handleGetProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await getProductById(prisma)(id);
    return res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a product and its tags by ID
 * @route   PUT /api/product/:id
 * @access  Admin
 * @docs    See: docs/api-doc.md#put-apiproductid
 */
export const handleUpdateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedProduct = await updateProduct(prisma)(id, req.body)
    return res.status(200).json({ data: updatedProduct, message:"Product updated" });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product and its tag links
 * @route   DELETE /api/product/:id
 * @access  Admin
 * @docs    See: docs/api-doc.md#delete-apiproductid
 */
export const handleDeleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProduct(prisma)(id);

    return res.status(200).json({ data: null, message:"Product deleted" });
  } catch (error) {
    next(error);
  }
};
