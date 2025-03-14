import { useEffect, useState } from "react";
import { useCartProducts } from "../../hooks/useCartProducts.jsx";
import AddWishListButton from "../Wishlist/AddWishListButton.jsx";
import AddToCartButton from "../Cart/AddToCartButton.jsx";

export default function ProductView({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price || 0);
  const { addProductById, removeProductById, cartProducts } = useCartProducts();
  const [isAdded, setIsAdded] = useState(false);

  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist") || "[]";
    return JSON.parse(storedWishlist);
  });

  const updateWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    try {
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("error", error);
    }
  };

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

  const addProduct = (id) => {
    addProductById(id, quantity);
    setIsAdded(true);
  };

  const removeProduct = (id) => {
    removeProductById(id);
    setIsAdded(false);
    setQuantity(1);
    setTotalPrice(product.price || 0);
  };

  useEffect(() => {
    const isProductInCart = cartProducts.some((cartProduct) => cartProduct.id === product.id);
    setIsAdded(isProductInCart);

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
                productId={product.id}
                isAdded={isAdded}
                onAddToCart={addProduct}
                onRemoveFromCart={removeProduct}
            />
            <div className="min-w-[40px] min-h-[40px] flex justify-center items-center bg-primarygray rounded">
              <AddWishListButton
                  productId={product.id}
                  wishlist={wishlist}
                  updateWishlist={updateWishlist}
              />
            </div>
          </div>
        </div>
      </div>
  );
}