import React from "react";

const ProductModal = ({
  isOpen,
  action,
  product,
  onChange,
  onClose,
  onAdd,
  onUpdate,
  onDelete,
  setProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold capitalize mb-4">{action}</h2>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={product.name}
          onChange={onChange("name")}
          placeholder="Name"
          name="name"
          className="border p-1 w-full mb-2"
        />

        <label>Description:</label>
        <input
          type="text"
          value={product.description}
          onChange={onChange("description")}
          placeholder="Description"
          className="border p-1 w-full mb-2"
        />

        <label>Price:</label>
        <input
          type="number"
          value={product.price}
          onChange={onChange("price")}
          placeholder="Price"
          className="border p-1 w-full mb-2"
        />

        <label>Photo URL:</label>
        <input
          type="text"
          value={product.photo}
          onChange={onChange("photo")}
          placeholder="Photo"
          className="border p-1 w-full mb-2"
        />

        <label>Quantity:</label>
        <input
          type="number"
          value={product.quantity}
          onChange={onChange("quantity")}
          className="border p-1 w-full mb-2"
        />

        <label>Category:</label>
        <select
          value={product.categoryName}
          onChange={onChange("categoryName")}
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
          value={product?.tagNames.join(", ")}
          onChange={(e) =>
            setProduct({
              ...product,
              tagNames: e.target.value.split(",").map((t) => t.trim()),
            })
          }
          placeholder="e.g. Protein, Vegan"
          className="border p-1 w-full mb-2"
        />

        <label>
          <input
            type="checkbox"
            checked={product.inStock}
            onChange={(e) =>
              setProduct({ ...product, inStock: e.target.checked })
            }
          />
          In Stock
        </label>

        <div>
          {action === "add" && (
            <button className="m-4 p-4" onClick={() => onAdd(product)}>
              Add
            </button>
          )}
          {action === "update" && (
            <button
              className="m-4 p-4"
              onClick={() => onUpdate(product.id, product)}
            >
              Update
            </button>
          )}
          {action === "delete" && (
            <button className="m-4 p-4" onClick={() => onDelete(product.id)}>
              Delete
            </button>
          )}
          <button className="m-4 p-4" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
