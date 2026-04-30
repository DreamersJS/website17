import prisma from '../config/prisma.js';

export const createCart = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const existingCart = await prisma.cart.findUnique({
            where: { userId }
        });

        if (existingCart) {
            return res.status(200).json(existingCart);
        }

        const cart = await prisma.cart.create({
            data: {
                userId
            }
        });

        res.status(201).json({ data: cart, message: 'Cart created' });
    } catch (error) {
        next(error);
    }
};

export const getCart = async (req, res, next) => {
    try {
        const userId = req.user.userId

        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { product: true }
                }
            }
        });
        if (!cart) {
            return res.status(200).json({
                data: { formattedItems: [], total: 0 },
                message: "Cart is empty"
            });
        }
        const total = totalCartPrice(cart)
        const formattedItems = cart.items.map(item => ({
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            stock: item.product.quantity,
            inStock: item.product.inStock,
            subtotal: item.quantity * item.product.price
        }));
        res.json({ data: { formattedItems, total }, message: 'Cart fetched' });
    } catch (error) {
        next(error)
    }
}

export const totalCartPrice = (cart) => {
    const total = cart.items.reduce((sum, item) => {
        return sum + item.quantity * item.product.price;
    }, 0);
    return total;
}

export const deleteCart = async (req, res, next) => {
    const cart = await prisma.cart.findUnique({
        where: { id: req.params.cartId }
    });

    if (!cart || cart.userId !== req.user.userId) {
        return res.status(403).json({ error: 'Not allowed' });
    }
    try {
        await prisma.cart.delete({
            where: { id: req.params.cartId }
        });

        res.json({ message: 'Cart deleted' });
    } catch (error) {
        next(error)
    }
};

// items in cart
export const setItemToCart = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { productId, quantity } = req.body;

        if (!productId || quantity == null) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        if (quantity <= 0) {
            return res.status(400).json({ error: "Quantity must be positive" });
        }

        const cart = await prisma.cart.upsert({
            where: { userId },
            create: { userId },
            update: {},
        });

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (!product.inStock) {
            return res.status(400).json({ error: "Product is out of stock" });
        }

        //check existing quantity
        const existingCartItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId
                }
            }
        });

        const currentQuantity = existingCartItem?.quantity || 0;
        const newTotalQuantity = currentQuantity + quantity;

        if (newTotalQuantity > product.quantity) {
            return res.status(400).json({
                error: `Only ${product.quantity - currentQuantity} left in stock`
            });
        }

        const item = await prisma.cartItem.upsert({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId
                }
            },
            update: {
                quantity: {
                    increment: quantity
                }
            },
            create: {
                cartId: cart.id,
                productId,
                quantity
            }
        });

        res.json({ data: item, message: 'Cart updated. Item added!' })
    } catch (error) {
        next(error)
    }
}

export const deleteItemInCart = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const productId = Number(req.params.productId);
        // console.log({req});
        if (Number.isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid productId' });
        }
        if (!productId) {
            return res.status(400).json({ error: 'No product' });
        }
        const cart = await prisma.cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        await prisma.cartItem.delete({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });

        return res.json({ message: 'Item removed from cart' });
    } catch (error) {
        next(error)
    }
}

export const updateQuantityInCart = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { productId, quantity } = req.body;

        if (!productId || quantity == null) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (!product.inStock) {
            return res.status(400).json({ error: "Product is out of stock" });
        }

        if (quantity > product.quantity) {
            return res.status(400).json({ error: "Quantity exceeds stock" });
        }

        const cart = await prisma.cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        if (quantity <= 0) {
            await prisma.cartItem.delete({
                where: {
                    cartId_productId: {
                        cartId: cart.id,
                        productId,
                    },
                },
            });

            return res.json({ message: 'Item removed from cart' });
        }

        const existingCartItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });

        if (!existingCartItem) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        const updatedCartItem = await prisma.cartItem.update({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
            data: {
                quantity,
            },
        });

        res.json({ data: updatedCartItem, message: 'Cart updated. Quantity updated!' })
    } catch (error) {
        next(error)
    }
};