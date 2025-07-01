import React,{ useState,useEffect } from "react";
import { addProductService, deleteProductService, getAllProductsService, updateProductService } from "../service/service";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userAtom";
import useScreenSize from "../hooks/useScreenSize";
import ResponsiveComponent from "../components/ResponsiveComponent";
import { useNavigate } from 'react-router-dom';

// admin access only 
const AddProduct = ()=>{
 const [allProducts, setAllProducts] = useState([]);
 const [allProductsFiltered, setAllProductsFiltered] = useState([]);
 const [product, setProduct] = useState({
    id:'', // this value will be given in db
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
 const user = useRecoilValue(userState);
 const isAdmin = user?.role === "ADMIN";
 const { width } = useScreenSize();
 const isMobile = width <= 600;
 const [modal, setModal] = useState(false)
 const navigate = useNavigate();


 useEffect(() => {
  if (!user?.id) {
    navigate('/login');
  }
  if (!isAdmin) {
    navigate('/');
  }
}, [user]);

 useEffect(()=>{
    getAllProducts() 
 },[])

 useEffect(()=>{
    console.log(allProducts)
 },[allProducts])

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

const handleUpdateProduct = async (id,newData) => {
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
    <ResponsiveComponent>
      {({width})=>(
<div>
 {/* list all products  - to the side да ползвам css листа от таласъмите и sm:w-full for mobile */}
 {/* add products */}
 {/* update products - dim modal when i type id? to see current info  or maybe when i click on product to see modal with action buttons or dropdown? */}
 {/* delete products */}
 {/* mobile-  add,update,delete buttons up, list bellow-scroll*/}
 <button onClick={() => handleButtonAction('add')}>Add</button>

<div className="m-2 p-2 shadow-lg border-black sm:w-full md:w-1/2">
<ul>
 {allProducts && allProducts.map((p)=>(
     <li key={p.id}>
      <div className="flex items-center gap-3 shadow-sm">
 <div>{p.name}</div>
 <div>{p.price}</div>
 {/* <div>{p.id}</div> */}
 <button onClick={() => {
  setProduct(p); // prefill product data
  handleButtonAction('update');
}}>Edit</button>
 <button onClick={() => { setProduct(p); handleButtonAction('delete')}}>Delete</button>
 </div>
 </li>
 ))}
 </ul>
 </div>
 


 {/* example modal */}
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
       {/* {action&& action==='add'?( <button onClick={() => handleAddProduct(product)}>add</button>):action==='update'?( <button>update</button>):( <button>delete</button>)} */}
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

      )}
   
    </ResponsiveComponent>
  )
}
export default AddProduct;