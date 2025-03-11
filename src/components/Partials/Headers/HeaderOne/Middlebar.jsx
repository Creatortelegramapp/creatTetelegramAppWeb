import Cart from "../../../Cart";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import { Link } from "react-router-dom";
import {useCartProducts} from "../../../../hooks/useCartProducts.jsx";
import {useEffect, useState} from "react";

export default function Middlebar({ className, type }) {

  const { cartProducts } = useCartProducts();
  const [cartProcuctQuantity, setCartProcuctQuantity] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateWishlistCount = () => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(wishlistItems.length);
  };

  useEffect(() => {
    updateWishlistCount();

    const handleWishlistUpdate = () => {
      updateWishlistCount();
    };

    window.addEventListener("storage", updateWishlistCount);
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("storage", updateWishlistCount);
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  useEffect(() => {
    setCartProcuctQuantity(cartProducts.reduce((acc, current) => {
      return acc + current.quantity
    }, 0));
  }, [cartProducts]);

  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              {type === 3 ? (
                <Link to="/">
                  <img
                    width="152"
                    height="36"
                    src={`${
                      import.meta.env.VITE_PUBLIC_URL
                    }/assets/images/logo-3.svg`}
                    alt="logo"
                  />
                </Link>
              ) : type === 4 ? (
                <Link to="/">
                  <img
                    width="152"
                    height="36"
                    src={`${
                      import.meta.env.VITE_PUBLIC_URL
                    }/assets/images/logo-4.svg`}
                    alt="logo"
                  />
                </Link>
              ) : (
                <Link to="/">
                  <img
                    width="152"
                    height="36"
                    src={`${
                      import.meta.env.VITE_PUBLIC_URL
                    }/assets/images/logo.svg`}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="favorite relative">
                <Link to="/wishlist" className="relative">
                  <ThinLove />
                  {wishlistCount > 0 && (
                      <span className="w-[18px] h-[18px] rounded-full bg-qh4-pink absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-qblack">
                        {wishlistCount}
                      </span>
                  )}
                </Link>
              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <Link to="/cart">
                    <span>
                      <ThinBag/>
                    </span>
                    {cartProcuctQuantity > 0 && (
                      <span
                           className="w-[18px] h-[18px] rounded-full bg-qh4-pink absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-qblack">
                           {cartProcuctQuantity}
                      </span>
                    )}
                  </Link>
                </div>
                <Cart
                    type={type}
                    className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                />
              </div>
              <div>
                <Link to="/login">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
