export const getProductByIdService = async (id) => {
  const res = await fetch(`/api/product/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('get product by id request failed');
  const data = await res.json();
  return data.data;
};
// get all products
export const getAllProductsService = async () => {
  const res = await fetch(`/api/product/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('get all products request failed');
  const data = await res.json();
  return data.data;
};
// add product
export const addProductService = async (product) => {
  const { name, description, photo, price, inStock, quantity, categoryId, categoryName, tagNames } = product;
  
  const res = await fetch(`/api/product/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      photo,
      price,
      inStock,
      quantity,
      categoryId,
      categoryName,
      tagNames,
    }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('service add product request failed');
  const data = await res.json();
  return data;
};
// /**
//  * @param {string} id - The unique id of the product.
//  * @param {Object} product - The product data to update.
//  * @returns {{ data: Object, message: string }} The updated product and a success message.
//  */
export const updateProductService = async (id, product) => {
  const { name, description, photo, price, inStock, quantity, categoryId, categoryName, tagNames } = product;

  const res = await fetch(`/api/product/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      photo,
      price,
      inStock,
      quantity,
      categoryId,
      categoryName,
      tagNames,
    }),
    credentials: 'include',
  });

  if (!res.ok) throw new Error('update product request failed');
  const data = await res.json();
  return data;
};
// delete product
export const deleteProductService = async (id) => {
  const res = await fetch(`/api/product/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('delete product request failed');
  const data = await res.json();
  return data.message;
};
