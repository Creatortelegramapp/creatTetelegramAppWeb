import { useState } from "react";

export default function ProductView({ product }) {
  if (!product) return <p>❌ Ապրանք չի գտնվել</p>;

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    setTotalPrice((prev) => prev + product.price);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setTotalPrice((prev) => prev - product.price);
    }
  };

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
              <p>📷 Նկար չկա</p>
          )}
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4">{product.name || "Անանուն ապրանք"}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.description || "Նկարագրություն չկա"}</p>
          <p className="text-xl font-semibold text-red-500 mb-4">
            {totalPrice.toLocaleString()} ֏
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
            <button className="px-5 py-3 bg-blue-600 text-white rounded-lg">
              🛒 Ավելացնել զամբյուղ
            </button>
            <button className="px-5 py-3 bg-gray-300 rounded-lg">
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>
  );
}
