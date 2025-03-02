import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategoryById } from "../../../../Services/HttpServices/CategoriesHttpService.js";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";

export default function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
    setCategoryToggle(false);
  };

  const toggleCategory = () => {
    setCategoryToggle(!categoryToggle);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCategoryById(2);
        setCategoryData(response.data.data);
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
              <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative">
                <button
                    onClick={toggleCategory}
                    className="w-full text-sm font-600 text-qblacktext flex justify-between items-center"
                >
                  <span className="flex-1 text-left pt-4">Տեսականին</span>
                  <span
                      className={`transform transition-transform pt-4 ${
                          categoryToggle ? "rotate-180" : "rotate-0"
                      }`}
                  >
                  ▼
                </span>
                </button>
                {categoryToggle && categoryData.length > 0 && (
                    <div className="absolute top-[53px] left-0 w-full bg-white shadow-lg">
                      {categoryData.map((category, index) => (
                          <Link
                              key={category.id || index}
                              to={`/all-products?categories=${category.id}`}
                              className="block text-lg font-semibold px-4 py-2 hover:bg-gray-100"
                          >
                            {category.name}
                          </Link>
                      ))}
                    </div>
                )}
              </div>
              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                  <li>
                    <Link to="/">Գլխավոր էջ</Link>
                  </li>
                  <li>
                    <Link to="/about">Մեր մասին</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Բլոգ</Link>
                  </li>
                  <li>
                    <Link to="/contact">Կոնտակտներ</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:hidden flex justify-between items-center w-full">
            <div className="w-[220px] h-[50px] relative m-auto">
              <SearchBox />
            </div>
            <div className="flex space-x-4 items-center">
              <Link to="/wishlist">
                <ThinLove/>
              </Link>
              <Link to="/cart">
                <ThinBag/>
              </Link>
              <Link to="/profile">
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
            <li className="border-b border-gray-300 pb-2">
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
                categoryData.length > 0 &&
                categoryData.map((category, index) => (
                    <li key={category.id || index} className="border-b border-gray-300 pb-2 pl-6">
                      <Link
                          to={`/all-products?categories=${category.id}`}
                          className="block text-lg font-semibold hover:bg-gray-100 px-4 py-2 rounded-md transition-all"
                      >
                        {category.name}
                      </Link>
                    </li>
                ))}
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
