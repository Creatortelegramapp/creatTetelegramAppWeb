import { useEffect, useState } from "react";
import { getCategoryById, getProductByCategory } from "../../Services/HttpServices/CategoriesHttpService.js";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import Layout from "../Partials/Layout";
import { useParams, useSearchParams } from "react-router-dom";
import { Loading } from "../Loading/index.jsx";
import { Range } from "react-range";

export default function AllProductPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriesParam = searchParams.get("categories") || "";
  const minPriceParam = searchParams.get("minPrice") || "0";
  const maxPriceParam = searchParams.get("maxPrice") || "1000000";

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([Number(minPriceParam), Number(maxPriceParam)]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategoryById(1);
      setCategories(categoriesData.data.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    let updatedCategories = categoriesParam ? categoriesParam.split(",").map(Number) : [];

    if (id) {
      const idAsNumber = Number(id);
      if (!updatedCategories.includes(idAsNumber)) {
        updatedCategories.push(idAsNumber);
      }
    }

    setSelectedCategories(updatedCategories);
    updateFiltersInUrl(updatedCategories, priceRange);
  }, [id, categoriesParam]);

  const updateFiltersInUrl = (newSelectedCategories, newPriceRange) => {
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

    setSearchParams(params);
  };

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
      if (selectedCategories.length === 0) {
        setProducts([]);
        setLoading(false);
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
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategories, priceRange]);

  useEffect(() => {
    const minPriceFromUrl = Number(minPriceParam);
    const maxPriceFromUrl = Number(maxPriceParam);
    setPriceRange([minPriceFromUrl, maxPriceFromUrl]);
  }, [minPriceParam, maxPriceParam]);

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
              {isFilterOpen && (
                  <div
                      className="lg:hidden fixed z-50 top-0 left-0 w-[300px] h-full bg-white transition-transform duration-300 transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} filter-modal">
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
                        <PriceRangeSlider min={0} max={1000000} step={100} onChange={handlePriceChange}
                                          initialValues={priceRange}/>
                      </div>
                    </div>
                  </div>
              )}
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
                  <PriceRangeSlider min={0} max={1000000} step={100} onChange={handlePriceChange}
                                    initialValues={priceRange}/>
                </div>
              </div>
              <div className="flex-1">
                {loading ? (
                    <p><Loading/></p>
                ) : products.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No products found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-[40px]">
                      {products.map((product) => (
                          <ProductCardStyleOne key={product.id} product={product}/>
                      ))}
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}

const PriceRangeSlider = ({min, max, step, onChange, initialValues}) => {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (newValues) => {
    setValues(newValues);
    onChange(newValues);
  };

  return (
      <div className="w-full p-4">
        <Range
            step={step}
            min={min}
            max={max}
            values={values}
            onChange={handleChange}
            renderTrack={({ props, children }) => (
                <div {...props} className="h-2 bg-gray-300 rounded relative">
                  <div
                      className="absolute h-2 bg-gray-600 rounded"
                      style={{
                        left: `${((values[0] - min) / (max - min)) * 100}%`,
                        right: `${100 - ((values[1] - min) / (max - min)) * 100}%`,
                      }}
                  />
                  {children}
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    className="w-5 h-5 bg-white border border-gray-500 rounded-full shadow cursor-pointer"
                />
            )}
        />
        <div className="text-center mt-2 text-lg font-semibold">
          ${values[0]} - ${values[1]}
        </div>
      </div>
  );
};
