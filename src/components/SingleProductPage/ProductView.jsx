import { useEffect, useState } from "react";
import AddWishListButton from "../Wishlist/AddWishListButton.jsx";
import AddToCartButton from "../Cart/AddToCartButton.jsx";
import {useCartProducts} from "../../hooks/useCartProducts.jsx";

export default function ProductView({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price || 0)
  const { cartProducts } = useCartProducts();

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * (product.price || 0));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setTotalPrice(newQuantity * (product.price || 0));
    }
  };

  useEffect(() => {
    const isProductInCart = cartProducts.some((cartProduct) => cartProduct.id === product.id);

    if (isProductInCart) {
      const cartProduct = cartProducts.find((p) => p.id === product.id);
      const cartQuantity = cartProduct?.quantity || 1;
      setQuantity(cartQuantity);
      setTotalPrice(cartQuantity * (product.price || 0));
    } else {
      setQuantity(1);
      setTotalPrice(product.price || 0);
    }
  }, [cartProducts, product.id, product.price]);

  return (
      <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-lg">
        <div className="md:w-1/2 flex justify-center items-center">
          {product.media_urls?.length > 0 ? (
              <img
                  src={product.media_urls[0]}
                  alt={product.name}
                  className="max-w-full h-auto rounded-lg"
              />
          ) : (
              <p>📷 Պատկեր չի գտնվել</p>
          )}
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4">{product.name || "Անանուն ապրանք"}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.description || "Նկարագրություն չկա"}</p>
          <p className="text-xl font-semibold text-red-500 mb-4">
            {isNaN(totalPrice) ? "0" : totalPrice.toLocaleString()} ֏
          </p>

          <div className="flex items-center mb-4">
            <button
                onClick={handleDecrease}
                className="px-3 py-2 bg-gray-200 rounded-l-lg text-lg"
            >
              ➖
            </button>
            <span className="px-4 py-2 text-lg border">{quantity}</span>
            <button
                onClick={handleIncrease}
                className="px-3 py-2 bg-gray-200 rounded-r-lg text-lg"
            >
              ➕
            </button>
          </div>

          <div className="flex gap-4">
            <AddToCartButton
                product={product}
                quantity={quantity}
            />
            <div className="min-w-[40px] min-h-[40px] flex justify-center items-center bg-primarygray rounded">
              <AddWishListButton
                  productId={product.id}
              />
            </div>
          </div>
        </div>
      </div>
  );
}