import {getTopProductById} from "../../Services/HttpServices/TopProductsHttpService.js";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getCategoryById} from "../../Services/HttpServices/CategoriesHttpService.js";


const categoryImages = [
  { id: 1, image_url: "https://media.tiffany.com/is/image/tiffanydm/2025_VDAY_HP_SBC_Earrings?$tile$&&fmt=webp", name: "Category 1" },
  { id: 2, image_url: "https://media.istockphoto.com/id/157185698/photo/circular-diamond-pendant-necklace-isolated-on-white.jpg?s=2048x2048&w=is&k=20&c=HzJMihfM-hTKlkmjBc0BJSJzypW-YPt3ffOK17ZaXaE=", name: "Category 2" },
  { id: 3, image_url: "https://media.istockphoto.com/id/658096268/photo/wedding-wedding-day-luxury-bracelet-on-the-brides-hand-close-up-hands-of-the-bride-before.jpg?s=2048x2048&w=is&k=20&c=491hM3yb0xJTaQW5xQO0KHtWsbu3D0U525mumc4zm_o=", name: "Category 3" },
  { id: 4, image_url: "https://media.istockphoto.com/id/1365426370/photo/woman-a-lot-of-jewelry-on-herself.jpg?s=2048x2048&w=is&k=20&c=UCZT7iVEo6eDoq3EMYnGjTsNcCFR6Yhq3qa4XPtmk5U=", name: "Category 4" },
  { id: 5, image_url: "https://media.istockphoto.com/id/891646116/photo/diamond-ring-on-glass-table.jpg?s=2048x2048&w=is&k=20&c=_7q1nIiDiDFA2xRZWusNXu5dSmy0vBEBZgwxxyymPvQ=", name: "Category 5" },
  { id: 6, image_url: "https://media.istockphoto.com/id/658096268/photo/wedding-wedding-day-luxury-bracelet-on-the-brides-hand-close-up-hands-of-the-bride-before.jpg?s=2048x2048&w=is&k=20&c=491hM3yb0xJTaQW5xQO0KHtWsbu3D0U525mumc4zm_o=", name: "Category 6" },
  { id: 7, image_url: "https://media.istockphoto.com/id/658096268/photo/wedding-wedding-day-luxury-bracelet-on-the-brides-hand-close-up-hands-of-the-bride-before.jpg?s=2048x2048&w=is&k=20&c=491hM3yb0xJTaQW5xQO0KHtWsbu3D0U525mumc4zm_o=", name: "Category 7" },
];

export default function Banner({ className }) {
  const [topProducts, setTopProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const categoryWidth = 150;

  const nextCategorySlide = () => {
    if (currentCategory < categories.length) {
      setCurrentCategory((prev) => prev + 1);
    }
  };

  const prevCategorySlide = () => {
    if (currentCategory > 0) {
      setCurrentCategory((prev) => prev - 1);
    }
  };

  useEffect(() => {
    getTopProductById().then((response) => {
      if (response?.data?.data) {
        setTopProducts(response.data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (topProducts.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [topProducts]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCategoryById();
        setCategories(response);
      } catch (error) {
        console.log("error", error);
      }
    }

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % topProducts.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + topProducts.length) % topProducts.length);
  };

  return (
      <>
        <div className={`w-full ${className || ""}`}>

          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center">
            {topProducts.length > 0 && (
                <div className="relative w-full h-full">
                  {topProducts.map((product, index) => (
                      <Link
                          key={product.product_id}
                          to={`/single-product/${product.product_id}`}
                          className="absolute w-full h-full transition-transform duration-700 ease-in-out"
                      >
                        <div
                            className={`w-full h-full bg-cover bg-center 
                            ${index === current ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
                            style={{ backgroundImage: `url(${product.image_url})` }}
                        />
                      </Link>
                  ))}
                </div>
            )}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full text-white transition-all hover:bg-opacity-75"
            >
              ◀
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full text-white transition-all hover:bg-opacity-75"
            >
              ▶
            </button>
          </div>
          <div className="container-x mx-auto">
            <div className="main-wrapper w-full">

              <div className="relative w-full max-w-6xl mx-auto md:h-[400px] flex justify-center items-center">
                <div className="overflow-hidden relative">
                  <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${currentCategory * categoryWidth}px)`,
                      }}
                  >
                    {categories.map((category, index) => (
                        <Link
                            key={category.id}
                            to={`/all-products/${category.id}`}
                            className="flex-shrink-0 w-[180px] h-[180px] mx-2 rounded-full overflow-hidden bg-cover bg-center relative transition-transform duration-500 transform hover:rotate-6 hover:scale-110"
                            style={{
                              backgroundImage: `url(${categoryImages[index]?.image_url || 'default-image.jpg'})`,
                            }}
                        >
                          <div
                              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold">
                            {category.name}
                          </div>
                        </Link>
                    ))}
                  </div>
                </div>
                {currentCategory > 0 && (
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
                        onClick={prevCategorySlide}
                    >
                      ←
                    </button>
                )}
                {currentCategory < categories.length && (
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
                        onClick={nextCategorySlide}
                    >
                      →
                    </button>
                )}
              </div>

                  <div
                      className="w-full h-[250px] bg-fixed bg-cover bg-no-repeat best-services bg-white flex flex-col lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] lg:py-0 py-10 relative"
                      style={{
                          backgroundImage: 'url("/assets/images/bgImg.png")',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          width: '100%',
                          height: '250px',
                      }}
                  >
                      <div className="flex flex-wrap justify-center items-center w-full">
                          <div
                              className="flex flex-col sm:flex-row sm:w-1/2 lg:w-1/4 justify-center items-center text-center sm:text-left mb-4">
                              <div>
                                  <p className="text-white text-[15px] font-700 tracking-wide">Անվճար առաքում</p>
                                  <p className="text-sm text-qblue-white"> $100-ից ավել պատվիրելիս </p>
                              </div>
                          </div>

                          <div
                              className="flex flex-col sm:flex-row sm:w-1/2 lg:w-1/4 justify-center items-center text-center sm:text-left">
                              <div>
                                  <p className="text-white text-[15px] font-700 tracking-wide">Անվճար վերադարձ</p>
                                  <p className="text-sm text-qblue-white"> Ստացեք վերադարձ 30 օրվա ընթացքում </p>
                              </div>
                          </div>

                          <div
                              className="flex flex-col sm:flex-row sm:w-1/2 lg:w-1/4 justify-center items-center text-center sm:text-left">
                              <div>
                                  <p className="text-white text-[15px] font-700 tracking-wide">Ապահով վճարում</p>
                                  <p className="text-sm text-qblue-white"> 100% անվտանգ առցանց վճարում </p>
                              </div>
                          </div>

                          <div
                              className="flex flex-col sm:flex-row sm:w-1/2 lg:w-1/4 justify-center items-center text-center sm:text-left">
                              <div>
                                  <p className="text-white text-[15px] font-700 tracking-wide">Լավագույն որակ</p>
                                  <p className="text-sm text-qblue-white"> Օրիգինալ ապրանքի երաշխիք </p>
                              </div>
                          </div>
                      </div>
                  </div>


              </div>
          </div>
        </div>
      </>
  )
      ;
}
