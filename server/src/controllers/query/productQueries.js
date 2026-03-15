// queries
export const getAllProducts = (prisma) => async () => {
    return prisma.product.findMany({
        include: {
            category: true,
            tags: { include: { tag: true } }
        }
    })
}

export const getProductById = (prisma) => async (id) => {
    try {
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
            return { error: 'Product not found' };
        }
        return product;
    } catch (error) {
        console.error('Error fetching product:', error.message);
        return { error: error.message };
    }
};

export const queryProductByName = (prisma) => async (name) => {
    try {
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
        if (!product) {
            console.error('Product not found', error.message);
            return null;
        }
        return product;
    } catch (error) {
        console.error('Error fetching product:', error.message);
    }
};

export const queryCategory = (prisma) => async (categoryName) => {
    let category = await prisma.category.findUnique({
        where: { name: categoryName },
    });
    return category;
}

/**
 * export const getAllProducts = async (req, res) => {
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
    // next(error); if I wanna pass the err to the error handler
    console.error('Error fetching products:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
 export const queryProductByName = (prisma) => async (name) => {
  return prisma.product.findUnique({
    where: { name }
  })
}

export const queryCategory = (prisma) => async (name) => {
  return prisma.category.findUnique({
    where: { name }
  })
}

export const getAllProducts = (prisma) => async () => {
  return prisma.product.findMany({
    include: {
      category: true,
      tags: { include: { tag: true } }
    }
  })
}
 */