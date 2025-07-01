// search
export const searchService = async (query) => {
  console.log({ query });
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  console.log({ res });
  if (!res.ok) throw new Error('Search request failed');
  const data = await res.json();
  console.log({ data });
  return data.results;
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
  //ok removed console.log(res) and it worked
  if (!res.ok) throw new Error('get all products request failed');
  const data = await res.json();
  return data.results;
};
// add product
export const addProductService = async (product) => {
  const {
    name,
    description,
    photo,
    price,
    inStock,
    quantity,
    categoryId,
    categoryName,
    tagNames,
  } = product;

  console.log('addProductService', {
    name,
    description,
    photo,
    price,
    inStock,
    quantity,
    categoryId,
    categoryName,
    tagNames,
  });

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
  console.log('addProductService response');
  if (!res.ok) throw new Error('service add product request failed');
  const data = await res.json();
  console.log('addProductService data');
  return data.results;
};
// update product
export const updateProductService = async (id, product) => {
  const {
    name,
    description,
    photo,
    price,
    inStock,
    quantity,
    category,
    tags
  } = product;

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
      categoryName: category || null,
      tagNames: tags
    }),
    credentials: 'include',
  });
  
  if (!res.ok) throw new Error('update product request failed');
  const data = await res.json();
  return data.results;
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
  console.log({ res });
  if (!res.ok) throw new Error('delete product request failed');
  const data = await res.json();
  console.log({ data });
  return data.results;
};
