import {environment} from "../../environment.dev.js";
import {useEffect, useState} from "react";
import ViewMoreTitle from "./ViewMoreTitle";
import {getProductByCategoryId} from "../../Services/HttpServices/CategoriesHttpService.js";
import AddWishListButton from "../Wishlist/AddWishListButton.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination} from "swiper/modules";
import AddToCartButton from "../Cart/AddToCartButton.jsx";

export default function SectionStyleOne({
                                          className,
                                          sectionTitle,
                                          seeMoreUrl,
                                          wishlist,
                                          updateWishlist,
                                        }) {
  const [productsData, setProductsData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    async function productsResponse() {
      const response = await getProductByCategoryId(environment.appId);
      setProductsData(response.data.data[0].products);
    }

    productsResponse();

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div data-aos="fade-up" className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          {isMobile ? (
            <Swiper
              spaceBetween={10}
              slidesPerView={1.5}
              pagination={{clickable: true}}
              modules={[Pagination]}
            >
              {productsData.map((data, index) => (
                <SwiperSlide key={index}>
                  <ProductCard
                    data={data}
                    wishlist={wishlist}
                    updateWishlist={updateWishlist}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid lg:grid-cols-4 xl:gap-[30px] gap-5">
              {productsData.slice(2, 6).map((data, index) => (
                <ProductCard
                  key={index}
                  data={data}
                  wishlist={wishlist}
                  updateWishlist={updateWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </ViewMoreTitle>
    </div>
  );
}

function ProductCard({data, wishlist, updateWishlist}) {
  return (
    <div>
      <div
        className="product-card-one w-full h-fit bg-white relative group overflow-hidden"
        style={{
          boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)",
          backgroundImage: `url(${data.media_urls[0]})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="product-card-img w-full h-[350px]"></div>
        <div className="product-card-details px-[30px] pb-[30px] relative">
          <div
            className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[-25px] transition-all duration-300 ease-in-out"
          >
            <AddToCartButton
              product={data}
            />
          </div>
        </div>
        <div
          className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-8 transition-all duration-300 ease-in-out">
          <AddWishListButton
            productId={data.id}
            wishlist={wishlist}
            updateWishlist={updateWishlist}
          />
        </div>
      </div>
      <div className="px-[30px] py-[10px] bg-white text-center">
        <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] hover:text-blue-600 font-sans">
          {data.name}
        </p>
        <div className="price">
          <div className="main-price text-qgray line-through font-600 text-[18px] font-sans">
            {data.price}
          </div>
        </div>
      </div>
    </div>
  );
}