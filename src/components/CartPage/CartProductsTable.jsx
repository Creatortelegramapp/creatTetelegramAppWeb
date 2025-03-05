import ProductsTable from "../../shared/components/ProductsTable.jsx";
import {useCartProducts} from "../../hooks/useCartProducts.jsx";

export default function CartProductsTable({ className,isCart }) {
  const { cartProducts, removeProductById } = useCartProducts();

  const onRemove = (id) => {
    removeProductById(id);
  }
  return (
    <ProductsTable products={cartProducts} onRemove={onRemove}  isCart={isCart}  />
  );
}
