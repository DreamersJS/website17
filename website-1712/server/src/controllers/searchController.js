import prisma from '../config/prisma.js'

export const searchProducts = async(req, res)=>{
  console.log(`Hey I'm controller`);
    const query = req.query.q?.trim().toLowerCase();

  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const results = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            {
              tags: {
                some: {
                  tag: {
                    name: { contains: query, mode: 'insensitive' },
                  }
                }
              }
            },
            {
              category: {
                name: { contains: query, mode: 'insensitive' }
              }
            }
          ]
        },
        include: {
          category: true,
          tags: {
            include: { tag: true }
          }
        }
      });
  
      res.json({ results });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
}
