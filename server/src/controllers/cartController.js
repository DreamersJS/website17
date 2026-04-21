import prisma from '../config/prisma.js';

export const createCart = async (req, res) => {
    try {
        const userId = req.user.id;

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

export const getCart = async (req, res) => {
    const cart = await prisma.cart.findUnique({
        where: { id: req.params.cartId }
    });

    if (!cart || cart.userId !== req.user.id) {
        return res.status(403).json({ error: 'Not allowed' });
    }
    res.json({ data: cart, message: 'Cart fetched' });
}

export const updateCart = async (req, res) => {
    const cart = await prisma.cart.findUnique({
        where: { id: req.params.cartId }
    });

    if (!cart || cart.userId !== req.user.id) {
        return res.status(403).json({ error: 'Not allowed' });
    }

    // const updatedCart = await prisma.cart.update(
    //     where: { id: req.params.cartId },
    //     data: {
    //         items:{req.body.items}
    //     }
    // )

}

export const deleteCart = async (req, res) => {
    const cart = await prisma.cart.findUnique({
        where: { id: req.params.cartId }
    });

    if (!cart || cart.userId !== req.user.id) {
        return res.status(403).json({ error: 'Not allowed' });
    }

    await prisma.cart.delete({
        where: { id: req.params.cartId }
    });

    res.json({ message: 'Cart deleted' });
};