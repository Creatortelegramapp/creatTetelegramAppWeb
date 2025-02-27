import SectionStyleOne from "../Helpers/SectionStyleOne";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Layout from "../Partials/Layout";
import Banner from "./Banner";
import CampaignCountDown from "./CampaignCountDown";
import ProductsAds from "./ProductsAds";
import {Link} from "react-router-dom";
import QuickViewIco from "../Helpers/icons/QuickViewIco.jsx";
import Compair from "../Helpers/icons/Compair.jsx";
import {useEffect, useState} from "react";
import AddWishListButton from "../Wishlist/AddWishListButton.jsx";
import {getProductByCategoryId} from "../../Services/HttpServices/CategoriesHttpService.js";
import {environment} from "../../environment.dev.js";

export default function Home() {

    const [productData, setProductData] = useState([]);

    const [wishlist, setWishlist] = useState(() => {
        const storedWishlist = localStorage.getItem("wishlist") || "[]";  // ✅
        return JSON.parse(storedWishlist);
    });

    useEffect(() => {
        async function productsResponse() {
            const response = await getProductByCategoryId(environment.appId);
            setProductData(response.data.data[0].products);
        }

        productsResponse();
        if(localStorage.getItem("wishlist")) {
            const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            setWishlist(storedWishlist);
        }

    }, []);
    const updateWishlist = (newWishlist) => {
        setWishlist(newWishlist);
        try {
            localStorage.setItem("wishlist", JSON.stringify(newWishlist));
            window.dispatchEvent(new Event("storage"));
        } catch (error) {
            console.error("error", error);
        }
    };


    return (
        <>
            <Layout>
                <div className="btn w-5 h-5 "></div>
                <Banner className="banner-wrapper mb-[60px]"/>
                <SectionStyleOne

                    categoryTitle="Բջջային և պլանշետ"
                    sectionTitle="Խաղացողի աշխարհ"
                    seeMoreUrl="/all-products"
                    className="category-products mb-[60px]"
                    wishlist={wishlist}
                    updateWishlist={updateWishlist}
                />

                <ProductsAds
                    sectionHeight="sm:h-[295px] h-full"
                    className="products-ads-section mb-[60px]"
                />
                <ViewMoreTitle
                    className="top-selling-product mb-[60px]"
                    seeMoreUrl="/all-products"
                    categoryTitle="Ամենավաճառվող ապրանքներ"
                >

                    <div className="grid lg:grid-cols-2 xl:gap-[30px] gap-25">
                        {productData.length && (
                            productData.slice(0, 4).map((data, index) => (
                                <div key={index}
                                    data-aos="fade-left"
                                    className={`product-row-card-style-one w-full h-[450px] bg-white group relative overflow-hidden `}
                                >
                                    <div className="flex space-x-5 items-center w-[700px] h-full lg:p-[30px] sm:p-5 p-2">
                                        <div className="lg:w-1/2 w-1/3 h-full"
                                        style={{
                                            backgroundImage: `url(${data.media_urls[0]})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center center",
                                        }}>

                                        </div>
                                        <div className="flex-1 flex flex-col justify-center h-full">
                                            <div>
                                                <Link to="/single-product">
                                                    <p className="title mb-2 sm:text-[15px] text-[13px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
                                                        {data.name}
                                                    </p>
                                                </Link>
                                                <div className="price mb-[26px]">
                                                    <div
                                                        className="main-price text-qgray line-through font-600 sm:text-[18px] text-base">
                                                        {data.price}
                                                    </div>
                                                </div>
                                                <button type="button" className="w-[110px] h-[30px]">
                                                    <div className={"yellow-btn"}>
                                                        {" "}
                                                        Add To Cart
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-[30px]  transition-all duration-300 ease-in-out">
                                        <button >
                                            <div
                                                className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                                                <QuickViewIco/>
                                            </div>
                                        </button>
                                        <div className="min-w-[40px] min-h-[40px] flex justify-center items-center bg-primarygray rounded">
                                            <AddWishListButton
                                                productId={data.id}
                                                wishlist={wishlist}
                                                updateWishlist={updateWishlist}
                                            />
                                        </div>
                                        <button >
                                            <div
                                                className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                                                <Compair/>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ViewMoreTitle>
                <CampaignCountDown
                    className="mb-[60px]"
                    lastDate="2025-10-04 4:00:00"
                />
            </Layout>
        </>
    );
}
