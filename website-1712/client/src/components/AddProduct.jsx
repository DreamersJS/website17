import React,{ useState,useEffect } from "react";
import { addProductService, deleteProductService, getAllProductsService, updateProductService } from "../service/service";

// admin access only 
const AddProduct = ()=>{
 const [allProducts, setAllProducts] = useState([]);
 const [allProductsFiltered, setAllProductsFiltered] = useState([]);
 const [product, setProduct] = useState({
    id:'', 
    name:'',
    description:'',
    photo:'',
    price:'',
    inStock: true,
    quantity: 1,
    categoryId: 2,
    categoryName : '',
    tagNames :[]
 });
 const [action, setAction] = useState('add')// update, delete 
 const [modal, setModal] = useState(false)

 useEffect(()=>{
    getAllProducts() 
 },[])

 const getAllProducts = async () => {
  try {
    const data = await getAllProductsService();
    setAllProducts(data);
    setAllProductsFiltered(data);
  } catch (error) {
    console.error(error);
  }
};

const validateProduct = (product) => {
  if (!product.name || !product.description || !product.price || !product.categoryName ) {
    alert("Please fill all required fields");
    return false;
  }
  return true;
};


 const updateProduct = (prop) => (e) => {
    setProduct({ ...product, [prop]: e.target.value });
  };


const handleAddProduct = async(data)=>{
console.log({data});
    try {
      // validateProduct(data)
      const payload = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        categoryId: Number(data.categoryId),
      };
      console.log("Payload:", payload);
    await addProductService(payload)
    getAllProducts(); // refresh list
    
} catch (error) {
    console.log(error)
}
}

const handleUpdateProduct = async (id,data) => {
  try {
    // validateProduct()
    const payload = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      categoryId: Number(data.categoryId),
    };
    await updateProductService(id, payload);
    await getAllProducts(); // refresh
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteProduct = async (id) => {
  try {
    await deleteProductService(id);
    await getAllProducts();
  } catch (error) {
    console.error(error);
  }
};
const toggleModal = () => {
  setModal(prev => !prev);
};
const handleButtonAction = (action) => {
setAction(action)
toggleModal()
}

  return(
<div className="flex flex-col sm:gap-2  md:items-center md:gap-4">

 <button 
  className="sm:w-full md:w-2/3 m-2 p-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition"
 onClick={() => handleButtonAction('add')}>Add new product</button>

 <div className="   m-4 p-4 sm:m-2 sm:p-2 shadow-lg border border-gray-300 rounded-lg sm:w-full bg-white">
  <ul className="divide-y divide-gray-200">
    {allProducts && allProducts.map((p) => (
      <li key={p.id} className="py-3 flex flex-col sm:flex-row  items-center justify-between hover:bg-gray-50 rounded-md px-3 transition duration-150">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full  sm:w-4/5 overflow-hidden">
          <div className="text-lg font-semibold text-gray-800 truncate max-w-xs sm:max-w-sm">{p.name}</div>
          <div className="text-sm text-gray-600 font-mono max-w-xs sm:max-w-sm">{p.price.toFixed(2)} BGN</div>
          {/* <div>{p.description}</div> */}
          <div className="truncate max-w-xs sm:max-w-sm">ID:{p.id}</div>
          <div className="truncate max-w-xs sm:max-w-sm">{p.category.name}</div>
          <div className="truncate flex flex-wrap gap-1">{p.tags.map(e=>(<span className="flex flex-col sm:flex-row sm:items-center truncate max-w-xs sm:max-w-sm">{e.tag.name}</span> ))}</div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 m-2">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition whitespace-nowrap"
            onClick={() => {
              setProduct(p); // prefill product data
              handleButtonAction('update');
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition whitespace-nowrap"
            onClick={() => {
              setProduct(p);
              handleButtonAction('delete');
            }}
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

 
 {/* modal */}
 {
  modal && (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
       <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
    <h2 className="text-xl font-semibold capitalize mb-4">{action}</h2>
    <label htmlFor="name">Name:</label>
    <input type="text" value={product.name} onChange={updateProduct("name")} placeholder="Name" name="name"  className="border p-1 w-full mb-2" />

    <label>Description:</label>
        <input type="text" value={product.description} onChange={updateProduct("description")} placeholder="Description" className="border p-1 w-full mb-2" />

        <label>Price:</label>
        <input type="number" value={product.price} onChange={updateProduct("price")} placeholder="Price" className="border p-1 w-full mb-2" />

        <label>Photo URL:</label>
        <input type="text" value={product.photo} onChange={updateProduct("photo")} placeholder="Photo" className="border p-1 w-full mb-2" />

        <label>Quantity:</label>
        <input type="number" value={product.quantity} onChange={updateProduct("quantity")} className="border p-1 w-full mb-2" />

        <label>Category:</label>
<select
  value={product.categoryName}
  onChange={updateProduct("categoryName")}
  className="border p-1 w-full mb-2"
>
  <option value="">-- Select Category --</option>
  <option value="Supplements">Supplements</option>
  <option value="Cosmetics">Cosmetics</option>
  <option value="Other">Other</option>
</select>

<label>Tags (comma separated):</label>
<input
  type="text"
  value={product.tagNames.join(', ')}
  onChange={(e) =>
    setProduct({ ...product, tagNames: e.target.value.split(',').map(t => t.trim()) })
  }
  placeholder="e.g. Protein, Vegan"
  className="border p-1 w-full mb-2"
/>

<label>
  <input
    type="checkbox"
    checked={product.inStock}
    onChange={(e) => setProduct({ ...product, inStock: e.target.checked })}
  />
  In Stock
</label>

    <div >
   {action === 'add' && <button className="m-4 p-4" onClick={() => handleAddProduct(product)}>Add</button>}
   {action === 'update' && <button className="m-4 p-4" onClick={() => handleUpdateProduct(product.id,product)}>Update</button>}
   {action === 'delete' && <button className="m-4 p-4" onClick={() => handleDeleteProduct(product.id)}>Delete</button>}
   <button className="m-4 p-4"  onClick={toggleModal}>Close</button>
    </div>
    </div>
    </div>
  )
 }
</div>
  )
}
export default AddProduct;