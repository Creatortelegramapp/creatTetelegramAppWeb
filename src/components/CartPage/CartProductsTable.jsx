import ProductsTable from "../../shared/components/ProductsTable.jsx";
import { useCartProducts } from "../../hooks/useCartProducts.jsx";

export default function CartProductsTable({isCart }) {
  const { cartProducts, removeProductById, updateProductQuantities } = useCartProducts();

  const onRemove = (id) => {
    removeProductById(id);
  };

  const onQuantityChange = (productId, amount) => {
    updateProductQuantities(productId, amount);
  };

  return (
      <ProductsTable
          products={cartProducts}
          onRemove={onRemove}
          onQuantityChange={onQuantityChange}
          isCart={isCart}
      />
  );
}
