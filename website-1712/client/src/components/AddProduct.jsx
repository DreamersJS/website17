import React, { useState, useEffect } from "react";
import { addProductService, deleteProductService, getAllProductsService, updateProductService } from "../service/service-product";
import { useFeedback } from './hoc/FeedbackContext';
import { Container } from "@mui/material";
import SearchToolBar from "./SearchToolbar";
import { useFilterSearchSort } from "../hooks/useFilterSearchSort";
import { useAsync } from "../hooks/useAsync";
import ProductModal from "./AddProductModal";

// admin access only 
const AddProduct = () => {
  // const [allProducts, setAllProducts] = useState([]);
  // const [allProductsFiltered, setAllProductsFiltered] = useState([]);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    photo: '',
    price: '',
    inStock: true,
    quantity: 1,
    categoryId: 2,
    categoryName: '',
    tagNames: []
  });
  const [action, setAction] = useState('add')// update, delete 
  const [modal, setModal] = useState(false)
  const [searchLocal, setSearchLocal] = useState("");
  const { showFeedback } = useFeedback();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const DEFAULT_VISIBLE_COUNT = 10;
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);

  const {
    loading,
    value: allProducts = [],
    error,
    refetch: getAllProducts, // renamed for semantic clarity
  } = useAsync(getAllProductsService, []);

  const allProductsFiltered = useFilterSearchSort({
    items: allProducts,
    searchQuery: searchLocal,
    searchKeys: ['name', 'tags.tag.name'],
    categoryKey: 'category.name',
    selectedCategory,
    sortKeys: [
      sortOption === 'name-asc' && { key: 'name', order: 'asc' },
      sortOption === 'name-desc' && { key: 'name', order: 'desc' },
      sortOption === 'price-asc' && { key: 'price', order: 'asc' },
      sortOption === 'price-desc' && { key: 'price', order: 'desc' },
      sortOption === 'newest' && { key: 'createdAt', order: 'desc' },
    ].filter(Boolean),
  });

  // useEffect(() => {
  //   getAllProducts()
  // }, [])

  // const getAllProducts = async () => {
  //   try {
  //     const data = await getAllProductsService();
  //     setAllProducts(data);
  //     // setAllProductsFiltered(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const validateProduct = (product) => {
    const requiredFields = {
      name: "Product name",
      description: "Description",
      price: "Price",
      categoryName: "Category",
    };

    const missingFields = Object.entries(requiredFields).filter(
      ([key]) => {
        const value = product[key];
        return value === undefined || value === null || value.toString().trim() === "";
      }
    );

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(([, label]) => label).join(", ");
      showFeedback(`Please fill in the following field(s): ${fieldNames}`, "error");
      console.log(`Please fill in the following field(s): ${fieldNames}`);
      return false;
    }

    // Additional check for price
    if (isNaN(product.price) || Number(product.price) <= 0) {
      showFeedback("Price must be a valid number greater than 0", "error");
      return false;
    }

    return true;
  };

  const updateProduct = (prop) => (e) => {
    setProduct({ ...product, [prop]: e.target.value });
  };

  const handleAddProduct = async (data) => {
    console.log({ data });
    try {
      if (!validateProduct(data)) {
        return;
      }
      const payload = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        categoryId: Number(data.categoryId),
      };
      console.log("Payload:", payload);
      await addProductService(payload)
      getAllProducts(); // refresh list
      toggleModal();
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateProduct = async (id, data) => {
    console.log({ id });
    console.log({ data });
    try {
      if (!validateProduct(data)) {
        return;
      }
      const payload = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      };
      await updateProductService(id, payload);
      await getAllProducts(); // refresh
      toggleModal()
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProductService(id);
      await getAllProducts();
      toggleModal();
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
  const prefillProduct = (productData) => {
    setProduct({
      ...productData,
      categoryName: productData.category.name,
      tagNames: productData.tags?.map(t => t.tag.name) || [],
    });
  };

  return (
    <div className="flex flex-col sm:gap-2  md:items-center md:gap-4 ">
      {/* Search and Filter Section */}
      <Container maxWidth="lg" >
        <SearchToolBar
          entityName="Products"
          searchTerm={searchLocal}
          onSearchChange={setSearchLocal}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categoryOptions={['Supplements', 'Cosmetics']}
          sortOption={sortOption}
          onSortChange={setSortOption}
          sortOptions={[
            { label: 'Name (A-Z)', value: 'name-asc' },
            { label: 'Name (Z-A)', value: 'name-desc' },
            { label: 'Price (Low to High)', value: 'price-asc' },
            { label: 'Price (High to Low)', value: 'price-desc' },
            { label: 'Newest', value: 'newest' },
          ]}
          visibleCount={visibleCount}
          onVisibleCountChange={setVisibleCount}
          showCountOptions={[10, 20]}
          totalCount={allProductsFiltered.length}
        />
      </Container>

      <button
        className="sm:w-full md:w-2/3 m-2 p-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition"
        onClick={() => handleButtonAction('add')}>Add new product
      </button>

      <div className="   m-4 p-4 sm:m-2 sm:p-2 shadow-lg border border-gray-300 rounded-lg sm:w-full bg-white">
        <ul className="divide-y divide-gray-200">
          {allProductsFiltered && allProductsFiltered.map((p) => (
            <li key={p.id} className="py-3 flex flex-col sm:flex-row  items-center justify-between hover:bg-gray-50 rounded-md px-3 transition duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full  sm:w-4/5 overflow-hidden">
                <div className="text-lg font-semibold text-gray-800 truncate max-w-xs sm:max-w-sm">{p.name}</div>
                <div className="text-sm text-gray-600 font-mono max-w-xs sm:max-w-sm">{p.price.toFixed(2)} BGN</div>
                {/* <div>{p.description}</div> */}
                <div className="truncate max-w-xs sm:max-w-sm">ID:{p.id}</div>
                <div className="truncate max-w-xs sm:max-w-sm">{p.category.name}</div>
                <div className="truncate flex flex-wrap gap-1">{p.tags.map(e => (<span key={e.tag.name} className="flex flex-col sm:flex-row sm:items-center truncate max-w-xs sm:max-w-sm">{e.tag.name}</span>))}</div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 m-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition whitespace-nowrap"
                  onClick={() => {
                    prefillProduct(p);
                    handleButtonAction('update');
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition whitespace-nowrap"
                  onClick={() => {
                    prefillProduct(p);
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
          <ProductModal
            isOpen={modal}
            action={action}
            product={product}
            onChange={updateProduct}
            onClose={toggleModal}
            onAdd={handleAddProduct}
            onUpdate={handleUpdateProduct}
            onDelete={handleDeleteProduct}
            setProduct={setProduct}
          />
        )
      }
    </div>
  )
}
export default AddProduct;