import { useEffect, useState } from "react";
import ViewMoreTitle from "./ViewMoreTitle";
import { getProductByCategoryId } from "../../Services/HttpServices/CategoriesHttpService.js";
import { environment } from "../../environment.dev.js";
import { Link } from "react-router-dom";
import QuickViewIco from "./icons/QuickViewIco.jsx";
import ThinLove from "./icons/ThinLove.jsx";
import Compair from "./icons/Compair.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function SectionStyleOne({ className, sectionTitle, seeMoreUrl }) {
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
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                    >
                        {productsData.map((data, index) => (
                            <SwiperSlide key={index}>
                                <ProductCard data={data} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="grid lg:grid-cols-4 xl:gap-[30px] gap-5">
                        {productsData.slice(0, 4).map((data, index) => (
                            <ProductCard key={index} data={data} />
                        ))}
                    </div>
                )}
            </div>
        </ViewMoreTitle>
    </div>
 );
}

function ProductCard({ data }) {
    return (
        <div
            className="product-card-one w-full h-full bg-white relative group overflow-hidden"
            style={{
                boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)",
                backgroundImage: `url(${data.media_urls[0]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <div className="product-card-img w-full h-[300px]"></div>
            <div className="product-card-details px-[30px] pb-[30px] relative">
                <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[20px] transition-all duration-300 ease-in-out">
                    <button type="button" className="yellow-btn">
                        <div className="flex items-center space-x-3">
                            <span>Add To Cart</span>
                        </div>
                    </button>
                </div>
                <Link to="/single-product">
                    <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
                        {data.name}
                    </p>
                </Link>
                <p className="price">
                    <div className="main-price text-qgray line-through font-600 text-[18px]">
                        {data.price}
                    </div>
                </p>
            </div>
            <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
                <a href="#"><div className="w-10 h-10 flex justify-center items-center bg-primarygray rounded"><QuickViewIco/></div></a>
                <a href="#"><div className="w-10 h-10 flex justify-center items-center bg-primarygray rounded"><ThinLove/></div></a>
                <a href="#"><div className="w-10 h-10 flex justify-center items-center bg-primarygray rounded"><Compair/></div></a>
            </div>
        </div>
    );
}
