import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderModal from "../OrderModal/index.jsx";
import { useCartProducts } from "../../hooks/useCartProducts.jsx";

export default function Cart({ className, type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { cartProducts, removeProductById } = useCartProducts();
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cartProducts.reduce((acc, product) => {
      return acc + (product.price * (product.quantity || 1));
    }, 0);

    setSubTotal(totalPrice);
  }, [cartProducts]);

  const handleRemove = (productId) => {
    setIsRemoving(true);
    removeProductById(productId);
    setTimeout(() => setIsRemoving(false), 500);
  };

  return (
      <>
        <div
            style={{ boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)" }}
            className={`w-[300px] bg-white border-t-[3px] ${
                type === 3 ? "border-qh3-blue" : "cart-wrappwer"
            } ${className || ""}`}
        >
          <div className="w-full h-full">
            <div className="product-items h-[310px] overflow-y-scroll">
              {isRemoving && (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-[13px] text-qgray">Հեռացվում է...</p>
                  </div>
              )}
              {!isRemoving && cartProducts.length > 0 ? (


                  <ul>
                    {cartProducts.map((product) => (
                        <li
                            key={product.id}
                            className="w-full h-full flex justify-between"
                        >
                          <div className="flex space-x-[6px] justify-center items-center px-4 my-[20px]">
                            <div className="w-[65px] h-full">
                              <Link to={`/single-product/${product.id}`}>
                                <img
                                    src={
                                      product.media_urls && product.media_urls.length > 0
                                          ? product.media_urls[0]
                                          : `${import.meta.env.VITE_PUBLIC_URL}/assets/images/product-img-1.jpg`
                                    }
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                              </Link>
                            </div>
                            <div className="flex-1 h-full flex flex-col justify-center">
                              <p className="title mb-2 text-[13px] font-600 text-qblack leading-4 line-clamp-2 hover:text-blue-600">
                                {product.name}
                              </p>
                              <p className="price">
                          <span className="offer-price text-qred font-600 text-[15px] ml-2">
                            ${product.price} {product.quantity > 1 && `x ${product.quantity}`}
                          </span>
                              </p>
                            </div>
                          </div>
                          <span
                              className="mt-[20px] mr-[15px] inline-flex cursor-pointer"
                              onClick={() => handleRemove(product.id)}
                          >
                      <svg
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                          className="inline fill-current text-[#AAAAAA] hover:text-qred"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z" />
                      </svg>
                    </span>
                        </li>
                    ))}
                  </ul>
              ) : !isRemoving && (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-[13px] text-qgray">Զամբյուղը դատարկ է</p>
                  </div>
              )}
            </div>
            <div className="w-full px-4 mt-[20px] mb-[12px]">
              <div className="h-[1px] bg-[#F0F1F3]"></div>
            </div>
            <div className="product-actions px-4 mb-[30px]">
              <div className="total-equation flex justify-between items-center mb-[28px]">
                <span className="text-[15px] font-500 text-qblack">Ընդամենը</span>
                <span className="text-[15px] font-500 text-qred">${subTotal}</span>
              </div>
              <div className="product-action-btn">
                <div className="gray-btn w-full h-[50px] mb-[10px]">
                  <Link to="/cart">
                    <span>Դիտել զամբյուղը</span>
                  </Link>
                </div>
                <div className="w-full h-[50px]">
                  <div className={type === 3 ? "blue-btn" : "yellow-btn"}>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={cartProducts.length === 0 || isRemoving}
                    >
                      Պատվիրել
                    </button>
                    <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 mt-[20px]">
              <div className="h-[1px] bg-[#F0F1F3]"></div>
            </div>
            <div className="flex justify-center py-[15px]">
              <p className="text-[13px] font-500 text-qgray">
                Վերադարձ 30 օրվա ընթացքում <span className="text-qblack">30 օր</span>
              </p>
            </div>
          </div>
        </div>
      </>
  );
}