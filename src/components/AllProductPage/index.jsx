import { useCallback, useEffect, useState } from "react";
import { getCategoryById, getProductByCategory, getProductByCategoryId } from "../../Services/HttpServices/CategoriesHttpService.js";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import Layout from "../Partials/Layout";
import { useSearchParams } from "react-router-dom";
import { Loading } from "../Loading/Loading.jsx";
import PriceRangeSlider from "../PriceRangeSlider";

export default function AllProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriesParam = searchParams.get("categories") || "";
  const minPriceParam = searchParams.get("minPrice") || "0";
  const maxPriceParam = searchParams.get("maxPrice") || "1000000";

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([Number(minPriceParam), Number(maxPriceParam)]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategoryById(2);
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const updateFiltersInUrl = useCallback((newSelectedCategories, newPriceRange) => {
    const params = new URLSearchParams();
    if (newSelectedCategories.length > 0) {
      params.set("categories", newSelectedCategories.join(","));
    }
    if (newPriceRange[0] !== 0) {
      params.set("minPrice", newPriceRange[0]);
    }
    if (newPriceRange[1] !== 1000000) {
      params.set("maxPrice", newPriceRange[1]);
    }
    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  useEffect(() => {
    let updatedCategories = categoriesParam ? categoriesParam.split(",").map(Number) : [];
    setSelectedCategories(updatedCategories);
    updateFiltersInUrl(updatedCategories, priceRange);
  }, [categoriesParam, priceRange, updateFiltersInUrl]);

  const checkboxHandler = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      const newSelectedCategories = prevSelectedCategories.includes(categoryId)
          ? prevSelectedCategories.filter((id) => id !== categoryId)
          : [...prevSelectedCategories, categoryId];
      updateFiltersInUrl(newSelectedCategories, priceRange);
      return newSelectedCategories;
    });
  };

  const handlePriceChange = (newValues) => {
    setPriceRange(newValues);
    updateFiltersInUrl(selectedCategories, newValues);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let finalProducts = [];

      const updatedCategories = categoriesParam ? categoriesParam.split(",").map(Number) : [];
      setSelectedCategories(updatedCategories);

      if (updatedCategories.length === 0) {
        const response = await getProductByCategoryId();
        if (response?.data?.data) {
          finalProducts = response?.data?.data.flatMap(category => category.products || []);
        }
      } else {
        const allProducts = await Promise.all(
            updatedCategories.map((categoryId) => getProductByCategory(categoryId))
        );
        finalProducts = allProducts.flatMap((item) => item?.data?.data || []);
      }

      finalProducts = finalProducts.filter(
          (product) => Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1]
      );

      setProducts(finalProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [categoriesParam, priceRange]);

  const toggleFilterModal = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <button className="lg:hidden flex items-center space-x-2 p-2 bg-gray-200 rounded-md mb-4" onClick={toggleFilterModal}>
              <span>☰ Filters</span>
            </button>
            {isFilterOpen && (
                <div className="fixed z-50 top-0 left-0 w-[300px] h-full bg-white p-5 shadow-lg">
                  <button onClick={() => setIsFilterOpen(false)} className="absolute top-2 right-2 text-xl font-semibold">X</button>
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
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Price Range</h2>
                    <PriceRangeSlider min={0} max={1000000} step={100} onChange={handlePriceChange} initialValues={priceRange} />
                  </div>
                </div>
            )}
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="hidden lg:block lg:w-[270px]">
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
                <div className="mt-4">
                  <h2 className="text-lg font-semibold mb-2">Price Range</h2>
                  <PriceRangeSlider min={0} max={1000000} step={100} onChange={handlePriceChange} initialValues={priceRange} />
                </div>
              </div>
              <div className="flex-1">
                {loading ? <Loading /> : products.length === 0 ? <p className="text-center text-gray-500 text-lg">No products found</p> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-[40px]">
                      {products.map((product) => <ProductCardStyleOne key={product.id} product={product} />)}
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}
