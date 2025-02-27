import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Arrow from "../../../Helpers/icons/Arrow";
import {getCategoryById} from "../../../../Services/HttpServices/CategoriesHttpService.js";

export default function Navbar({ type }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  const [categoryData,setCategoryData] = useState([]);

  const handler = () => {
    setToggle(!categoryToggle);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCategoryById(2);
        setCategoryData(response.data.data)
      } catch (error) {
        console.log("error", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (categoryToggle && getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);

  return (
    <div
      className={`nav-widget-wrapper w-full  h-[60px] relative z-30`}
      style={{
        backgroundColor:"#f1c6d6"
      }}
    >
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
              <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative">
                <button
                  onClick={handler}
                  type="button"
                  className="w-full h-full flex justify-between items-center"
                >
                  <div className="flex space-x-3 items-center">
                    <span>
                      <svg
                        className="fill-current"
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="14" height="1" />
                        <rect y="8" width="14" height="1" />
                        <rect y="4" width="10" height="1" />
                      </svg>
                    </span>
                    <span className="text-sm font-600 text-qblacktext">
                      Տեսականի
                    </span>
                  </div>
                  <div>
                    <Arrow
                      width="5.78538"
                      height="1.28564"
                      className="fill-current text-qblacktext"
                    />
                  </div>
                </button>
                {categoryToggle && (
                  <div
                    className="fixed top-0 left-0 w-full h-full -z-10"
                    onClick={handler}
                  ></div>
                )}
                <div
                  className="category-dropdown w-full absolute left-0 top-[53px] overflow-hidden"
                  style={{ height: `${elementsSize} ` }}
                >
                  {categoryData.length && categoryToggle && (
                      <ul className='categories-list'>
                          {categoryData.map((category,index) => (
                              <li className="category-item"
                                  key={category.id || index}>
                                <Link to={`/all-products?categories=${category.id}`}>
                                      <div
                                          className={`flex justify-between items-center px-5 h-10 bg-white 
                                       transition-all duration-300 ease-in-out cursor-pointer text-qblack ${type === 3 ? "hover:bg-qh3-blue hover:text-white w-full" : "hover:bg-qyellow"}`}
                                      >
                                          <div className="flex items-center space-x-6 w-full">
                                          <span className='text-xs font-400'>
                                          {category.name}
                                          </span>
                                          </div>
                                      </div>
                                  </Link>
                              </li>
                          ))}
                      </ul>
                  ) }
                </div>
              </div>
              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">

                  <li className="relative">

                    <Link to="/">
                      <span
                          className={`flex items-center text-sm font-600 cursor-pointer ${
                              type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                      <span>Գլխավոր էջ</span>
                    </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${
                          type === 3 ? "text-white" : "text-qblacktext"
                        }`}
                      >
                        <span>Մեր մասին</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${
                          type === 3 ? "text-white" : "text-qblacktext"
                        }`}
                      >
                        <span>Բլոգ</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${
                          type === 3 ? "text-white" : "text-qblacktext"
                        }`}
                      >
                        <span>Կոնտակտներ</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
