export const getAllProducts = (prisma) => async () => {
    return prisma.product.findMany({
        include: {
            category: true,
            tags: { include: { tag: true } }
        }
    })
}

export const getProductById = (prisma) => async (id) => {
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
            category: true,
            tags: {
                include: {
                    tag: true,
                },
            },
        },
    });
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

export const queryProductByName = (prisma) => async (name) => {
    const product = await prisma.product.findUnique({
        where: { name },
        include: {
            category: true,
            tags: {
                include: {
                    tag: true,
                },
            },
        },
    });
    return product;
};

export const queryCategory = (prisma) => async (categoryName) => {
    let category = await prisma.category.findUnique({
        where: { name: categoryName },
    });
    return category;
}
