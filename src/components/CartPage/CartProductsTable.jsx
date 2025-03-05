import { useState } from "react";
import ProductsTable from "../../shared/components/ProductsTable.jsx";
import { useCartProducts } from "../../hooks/useCartProducts.jsx";

export default function CartProductsTable({ className }) {
  const { cartProducts, removeProductById } = useCartProducts();
  const [updatedProducts, setUpdatedProducts] = useState(cartProducts);

  const onRemove = (id) => {
    removeProductById(id);
    setUpdatedProducts(updatedProducts.filter((product) => product.id !== id));
  };

  const onQuantityChange = (productId, amount) => {
    setUpdatedProducts((prevProducts) =>
        prevProducts.map((product) =>
            product.id === productId
                ? {
                  ...product,
                  quantity: Math.max(1, (product.quantity || 1) + amount),
                }
                : product
        )
    );
  };

  return (
      <ProductsTable
          products={updatedProducts}
          onRemove={onRemove}
          onQuantityChange={onQuantityChange}
      />
  );
}
