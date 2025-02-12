import { useEffect, useState } from "react";
import { getCategoryById, getProductByCategory } from "../../Services/HttpServices/CategoriesHttpService.js";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import Layout from "../Partials/Layout";
import { useParams } from "react-router-dom";

export default function AllProductPage() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategoryById(1);
      setCategories(categoriesData.data.data);
    };
    fetchCategories();
  }, []);

  const checkboxHandler = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      const newSelectedCategories = prevSelectedCategories.includes(categoryId)
          ? prevSelectedCategories.filter((id) => id !== categoryId)
          : [...prevSelectedCategories, categoryId];
      setIsFilterOpen(false);
      return newSelectedCategories;
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategories.length === 0) {
        setProducts([]);
        return;
      }

      const allProducts = await Promise.all(
          selectedCategories.map((categoryId) => getProductByCategory(categoryId))
      );

      const filteredProducts = allProducts.flatMap((item) => item.data.data);
      const finalProducts = filteredProducts.filter(
          (product) => Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1]
      );

      setProducts(finalProducts);
    };

    fetchProducts();
  }, [selectedCategories, priceRange]);

  useEffect(() => {
    if (id) {
      setSelectedCategories([Number(id)]);
    }
  }, [id]);

  const toggleFilterModal = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <div className="w-full lg:flex lg:space-x-[30px]">
              <button
                  className="lg:hidden flex items-center space-x-2 p-2 bg-gray-200 rounded-md mb-4"
                  onClick={toggleFilterModal}
              >
                <span>☰ Filters</span>
              </button>
              <div
                  className={`lg:hidden fixed z-50 top-0 left-0 w-[300px] h-full bg-white transition-transform duration-300 transform ${
                      isFilterOpen ? "translate-x-0" : "-translate-x-full"
                  } filter-modal`}
              >
                <div className="relative p-5">
                  <button
                      onClick={() => setIsFilterOpen(false)}
                      className="absolute top-2 right-2 text-xl font-semibold"
                  >
                    X
                  </button>
                  <h2 className="text-lg font-semibold mb-2">Categories</h2>
                  {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => checkboxHandler(category.id)}
                        />
                        <label>{category.name}</label>
                      </div>
                  ))}
                  <div>
                    <h2 className="text-lg font-semibold mt-4 mb-2">Price Range</h2>
                    <div className="flex space-x-2 mb-2">
                      <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="border rounded p-1 w-20"
                      />
                      <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="border rounded p-1 w-20"
                      />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10000000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full mb-2"
                    />
                    <input
                        type="range"
                        min="0"
                        max="10000000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden lg:block lg:w-[270px]">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Categories</h2>
                  {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => checkboxHandler(category.id)}
                        />
                        <label>{category.name}</label>
                      </div>
                  ))}
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Price Range</h2>
                  <div className="flex space-x-2 mb-2">
                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="border rounded p-1 w-20"
                    />
                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="border rounded p-1 w-20"
                    />
                  </div>
                  <input
                      type="range"
                      min="0"
                      max="10000000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full mb-2"
                  />
                  <input
                      type="range"
                      min="0"
                      max="10000000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-[40px]">
                  {products.length === 0 ? (
                      <p>No products found</p>
                  ) : (
                      products.map((product) => (
                          <ProductCardStyleOne key={product.id} datas={product} />
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}