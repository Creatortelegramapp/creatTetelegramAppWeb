import {getTopProductById} from "../../Services/HttpServices/TopProductsHttpService.js";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getCategoryById} from "../../Services/HttpServices/CategoriesHttpService.js";


const categoryImages = [
  { id: 1, image_url: "https://media.tiffany.com/is/image/tiffanydm/2025_VDAY_HP_SBC_Earrings?$tile$&&fmt=webp", name: "Category 1" },
  { id: 2, image_url: "https://media.istockphoto.com/id/157185698/photo/circular-diamond-pendant-necklace-isolated-on-white.jpg?s=2048x2048&w=is&k=20&c=HzJMihfM-hTKlkmjBc0BJSJzypW-YPt3ffOK17ZaXaE=", name: "Category 2" },
  { id: 3, image_url: "https://media.istockphoto.com/id/658096268/photo/wedding-wedding-day-luxury-bracelet-on-the-brides-hand-close-up-hands-of-the-bride-before.jpg?s=2048x2048&w=is&k=20&c=491hM3yb0xJTaQW5xQO0KHtWsbu3D0U525mumc4zm_o=", name: "Category 3" },
  // { id: 4, image_url: "https://media.istockphoto.com/id/1365426370/photo/woman-a-lot-of-jewelry-on-herself.jpg?s=2048x2048&w=is&k=20&c=UCZT7iVEo6eDoq3EMYnGjTsNcCFR6Yhq3qa4XPtmk5U=", name: "Category 4" },
  // { id: 5, image_url: "https://media.istockphoto.com/id/891646116/photo/diamond-ring-on-glass-table.jpg?s=2048x2048&w=is&k=20&c=_7q1nIiDiDFA2xRZWusNXu5dSmy0vBEBZgwxxyymPvQ=", name: "Category 5" },
  // { id: 6, image_url: "https://media.istockphoto.com/id/658096268/photo/wedding-wedding-day-luxury-bracelet-on-the-brides-hand-close-up-hands-of-the-bride-before.jpg?s=2048x2048&w=is&k=20&c=491hM3yb0xJTaQW5xQO0KHtWsbu3D0U525mumc4zm_o=", name: "Category 6" },
  // { id: 7, image_url: "https://media.istockphoto.com/id/658096268/photo/wedding-wedding-day-luxury-bracelet-on-the-brides-hand-close-up-hands-of-the-bride-before.jpg?s=2048x2048&w=is&k=20&c=491hM3yb0xJTaQW5xQO0KHtWsbu3D0U525mumc4zm_o=", name: "Category 7" },
  // { id: 8, image_url: "https://media.istockphoto.com/id/658096268/photo/wedding-wedding-day-luxury-bracelet-on-the-brides-hand-close-up-hands-of-the-bride-before.jpg?s=2048x2048&w=is&k=20&c=491hM3yb0xJTaQW5xQO0KHtWsbu3D0U525mumc4zm_o=", name: "Category 8" },
];

export default function Banner({className}) {

  const [topProducts, setTopProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);

  console.log(categoryImages)

  useEffect(() => {
    getTopProductById().then((response) => {
      if (response?.data?.data) {
        setTopProducts(response?.data?.data);
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
        const response = await getCategoryById(1);
        setCategories(response.data.data);
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

  // const nextCategory = () => {
  //   if (currentCategory < categories.length - 5) {
  //     setCurrentCategory(currentCategory + 1);
  //   }
  // };
  //
  // const prevCategory = () => {
  //   if (currentCategory > 0) {
  //     setCurrentCategory(currentCategory - 1);
  //   }
  // };

  return (
      <>
        <div className={`w-full ${className || ""}`}>

          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center">
            {topProducts.length > 0 && (
                <div className="relative w-full h-full">
                  {topProducts.map((product, index) => (
                      <Link
                          key={product.product_id}
                          to={`/single-product/${product.product_id}`} // Այժմ id-ն կլինի ճիշտ
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

              <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden flex justify-center items-center">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `translateX(-${currentCategory * 150}px)`,
                    }}
                >
                  {categories.map((category) => (
                      <Link
                          key={category.id}
                          to={`/all-products/${category.id}`} // Այստեղ կապվում է այդ կատեգորիայի էջը
                          className="flex-shrink-0 w-[180px] h-[180px] mx-4 rounded-full overflow-hidden bg-cover bg-center relative transition-transform duration-500 transform hover:rotate-6 hover:scale-110"
                          style={{ backgroundImage: `url(${categoryImages[0].image_url || 'default-image.jpg'})` }}
                      >
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold">
                          {category.name}
                        </div>
                      </Link>
                      // </div>
                  ))}
                </div>

                {/*<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-4">*/}
                {/*  <button*/}
                {/*      onClick={prevCategory}*/}
                {/*      disabled={currentCategory === 0}*/}
                {/*      className={`bg-gray-800 bg-opacity-50 p-3 rounded-full text-white transition-all hover:bg-opacity-75 ${currentCategory === 0 ? "cursor-not-allowed opacity-50" : ""}`}*/}
                {/*  >*/}
                {/*    ◀*/}
                {/*  </button>*/}
                {/*  <button*/}
                {/*      onClick={nextCategory}*/}
                {/*      disabled={currentCategory === categories.length - 6}*/}
                {/*      className={`bg-gray-800 bg-opacity-50 p-3 rounded-full text-white transition-all hover:bg-opacity-75 ${currentCategory === categories.length - 6 ? "cursor-not-allowed opacity-50" : ""}`}*/}
                {/*  >*/}
                {/*    ▶*/}
                {/*  </button>*/}
                {/*</div>*/}
              </div>

              <div
                  // data-aos="fade-up"
                  className="w-full h-[250px] bg-fixed bg-cover bg-no-repeat best-services  bg-white flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10"
                  style={
                    {
                      backgroundImage: `url("/assets/images/2.webp")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      width: '100%',
                      height: '250px',

                    }
                  }
              >
                <div className="item">
                  <div className="flex space-x-5 items-center">
                    <div>
                    <span>
                      <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            d="M1 1H5.63636V24.1818H35"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                        <path
                            d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                        <path
                            d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                        <path
                            d="M34.9982 1H11.8164V18H34.9982V1Z"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                        <path
                            d="M11.8164 7.18164H34.9982"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                      </svg>
                    </span>
                    </div>
                    <div>
                      <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                        Անվճար առաքում
                      </p>
                      <p className="text-sm text-qgray">
                        $100-ից ավել պատվիրելիս
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="flex space-x-5 items-center">
                    <div>
                    <span>
                      <svg
                          width="32"
                          height="34"
                          viewBox="0 0 32 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M30.7 2L29.5 10.85L20.5 9.65"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                      </svg>
                    </span>
                    </div>
                    <div>
                      <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                        Անվճար վերադարձ
                      </p>
                      <p className="text-sm text-qgray">
                        Ստացեք վերադարձ 30 օրվա ընթացքում
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="flex space-x-5 items-center">
                    <div>
                    <span>
                      <svg
                          width="32"
                          height="38"
                          viewBox="0 0 32 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                        <path
                            d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                        <path
                            d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                      </svg>
                    </span>
                    </div>
                    <div>
                      <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                        Ապահով վճարում
                      </p>
                      <p className="text-sm text-qgray">
                        100% անվտանգ առցանց վճարում
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="flex space-x-5 items-center">
                    <div>
                    <span>
                      <svg
                          width="32"
                          height="35"
                          viewBox="0 0 32 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M16 28V22"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                        <path
                            d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                      </svg>
                    </span>
                    </div>
                    <div>
                      <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                        Լավագույն որակ
                      </p>
                      <p className="text-sm text-qgray">
                        Օրիգինալ ապրանքի երաշխիք
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<Slider/>*/}
          </div>
        </div>
      </>
  );
}
