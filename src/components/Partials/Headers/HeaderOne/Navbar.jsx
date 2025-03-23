import { useEffect, useState } from "react";
import { Link , useLocation} from "react-router-dom";
import { getCategoryById } from "../../../../Services/HttpServices/CategoriesHttpService.js";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import {useCartProducts} from "../../../../hooks/useCartProducts.jsx";
import {localStorageKeys} from "../../../../constants/lockalStorageDatas.js";

export default function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const { cartProducts } = useCartProducts();
  const [cartProcuctQuantityMobile, setCartProcuctQuantityMobile] = useState(0);
  const [wishlistCountMobile, setWishlistCountMobile] = useState(0);

  const location = useLocation();

  const updateWishlistCount = () => {
    const wishlistItems = JSON.parse(localStorage.getItem(localStorageKeys.wishlist)) || [];
    setWishlistCountMobile(wishlistItems.length);
  };

  useEffect(() => {
    updateWishlistCount();

    const handleWishlistUpdate = () => {
      updateWishlistCount();
    };

    window.addEventListener("storage", updateWishlistCount);
    window.addEventListener("wishlist-Updated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("storage", updateWishlistCount);
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
    };
  }, []);

  useEffect(() => {
    setCartProcuctQuantityMobile(cartProducts.reduce((acc, current) => {
      return acc + current.quantity
    }, 0));
  }, [cartProducts]);

  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
    setCategoryToggle(false);
  };

  const toggleCategory = () => {
    setCategoryToggle(!categoryToggle);
  };

  const closeDropdown = () => {
    setCategoryToggle(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCategoryById(2);
        setCategoryData(response);
      } catch (error) {
        console.log("error", error);
      }
    }

    fetchData();
  }, []);

  return (
      <div className="nav-widget-wrapper w-full h-[60px] relative z-30 bg-[#f1c6d6]">
        <div className="container-x mx-auto h-full flex justify-between items-center">
          <button
              onClick={toggleMenu}
              className="lg:hidden text-2xl left-5"
          >
            ☰
          </button>
          <div className="hidden lg:flex justify-between w-full">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
              <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative"

              >
                <button
                    onClick={toggleCategory}
                    className="w-full text-sm font-600 text-qblacktext flex justify-between items-center"
                >
                  <span className="flex-1 text-left pt-4 font-sans font-bold text-base">Տեսականի</span>
                  <span
                      className={`transform transition-transform pt-4 ${
                          categoryToggle ? "rotate-180" : "rotate-0"
                      }`}
                  >
                  ▼
                </span>
                </button>
                {categoryToggle && categoryData.length > 0 && (
                    <>
                      <div className="fixed inset-0 w-full h-full -z-10" onClick={closeDropdown}></div>
                      <div className="absolute top-[53px] left-0 w-full bg-white shadow-lg z-20">
                        {categoryData.map((category, index) => (
                            <Link
                                key={category.id || index}
                                to={`/all-products?categories=${category.id}`}
                                className="block text-base font-semibold px-4 py-2 hover:bg-gray-100 font-sans font-400"
                            >
                              {category.name}
                            </Link>
                        ))}
                        <Link to={"/all-products"} className="block text-base font-semibold px-4 py-2 hover:bg-gray-100 font-sans font-400">
                          Բոլորը
                        </Link>
                      </div>
                    </>
                )}
              </div>
              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5 font-sans font-400">
                  {[
                    {name: "Գլխավոր էջ", path: "/"},
                    {name: "Մեր մասին", path: "/about"},
                    {name: "Բլոգ", path: "/blogs"},
                    {name: "Կոնտակտներ", path: "/contact"}
                  ].map((item) => (
                      <li key={item.path}>
                        <Link
                            to={item.path}
                            className={`pb-2 transition duration-300 ${
                                location.pathname === item.path
                                    ? "text-pink-500 font-bold border-b-2 border-pink-500"
                                    : "text-gray-600 hover:text-pink-400"
                            }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:hidden flex justify-between items-center w-full">
            <div className="w-[220px] h-[50px] relative m-auto">
              <SearchBox/>
            </div>
            <div className="flex space-x-4 items-center">
              <Link to="/wishlist" className="relative">
                <ThinLove/>
                {wishlistCountMobile > 0 && (
                    <span
                        className="w-[18px] h-[18px] rounded-full bg-qh4-pink absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-qblack">
                          {wishlistCountMobile}
                        </span>
                )}
              </Link>
              <Link to="/cart" className="relative">
                <span>
                      <ThinBag/>
                    </span>
                {cartProcuctQuantityMobile > 0 && (
                    <span
                        className="w-[18px] h-[18px] rounded-full bg-qh4-pink absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-qblack">
                           {cartProcuctQuantityMobile}
                      </span>
                )}
              </Link>
              <Link to="/#">
                <ThinPeople/>
              </Link>
            </div>
          </div>
        </div>
        <div
            className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-lg transform transition-transform duration-300 ${
                menuToggle ? "translate-x-0" : "-translate-x-full"
            } z-50 lg:hidden`}
        >
          <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-red-500"
          >
            ×
          </button>

          <ul className="p-6 space-y-4">
            <li className="border-b border-gray-300 pb-2 ">
              <Link
                  to="/"
                  className="block text-lg font-semibold hover:bg-gray-100 px-4 py-2 rounded-md transition-all"
              >
                Գլխավոր էջ
              </Link>
            </li>
            <li className="border-b border-gray-300 pb-2">
              <Link
                  to="/about"
                  className="block text-lg font-semibold hover:bg-gray-100 px-4 py-2 rounded-md transition-all"
              >
                Մեր մասին
              </Link>
            </li>
            <li className="border-b border-gray-300 pb-2">
              <Link
                  to="/blogs"
                  className="block text-lg font-semibold hover:bg-gray-100 px-4 py-2 rounded-md transition-all"
              >
                Բլոգ
              </Link>
            </li>
            <li className="border-b border-gray-300 pb-2">
              <Link
                  to="/contact"
                  className="block text-lg font-semibold hover:bg-gray-100 px-4 py-2 rounded-md transition-all"
              >
                Կոնտակտներ
              </Link>
            </li>
            <li className="text-lg font-bold mt-6 border-t pt-4">
              <button
                  onClick={toggleCategory}
                  className="w-full flex justify-between items-center text-lg font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-all"
              >
                Տեսականի
                <span
                    className={`transform transition-transform ${
                        categoryToggle ? "rotate-180" : "rotate-0"
                    }`}
                >
                ▼
              </span>
              </button>
            </li>

            {categoryToggle &&
                categoryData.length > 0 && (
                    <>
                      {categoryData.map((category, index) => (
                          <li key={category.id || index} className="border-b border-gray-300 pb-2 pl-6">
                            <Link
                                to={`/all-products?categories=${category.id}`}
                                className="block text-base font-semibold hover:bg-gray-100 px-4 py-2 rounded-md transition-all"
                            >
                              {category.name}
                            </Link>
                          </li>
                      ))}
                      <li className="border-gray-300 pl-6">
                        <Link to={"/all-products"}
                              className="block text-base font-semibold px-4 py-2 hover:bg-gray-100 font-sans font-400"
                        >
                          Բոլորը
                        </Link>
                      </li>
                    </>
                )
            }
          </ul>
        </div>
        {menuToggle && (
            <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 lg:hidden"
                onClick={toggleMenu}
            ></div>
        )}
      </div>
  );
}
